
var url;
var timeoutVal = 30000;

/************************************* Login functionality **************************************/
function login(name,pwd,device){
    url = SETTINGS.ENTERPRISE_APP_BASE_URL;
    console.log("Base URL : "+url);
    
    //Authentication Request
    logLoginAuthRequest();
    
    try{
        if((name!="")&&(pwd!="")){
            $.mobile.showPageLoadingMsg();
            var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_LOGIN;
            //var l_url= "http://ryoheemecars.ap01.aws.af.cm/api/mobile/auth/authenticate-login/";
            //var l_url= "http://devl.enterprise.mecars.ryohee.com/src/MECARS/index.php/api/mobile/auth/authenticate-login/";
            console.log("Login URL : "+l_url+" with timeout : "+timeoutVal +" with name : "+name+" with pwd : "+pwd);
            var dta= { 'username': name, 'password': pwd, 'device': { deviceName : device.name,devicePhonegap : device.phonegap, deviceUDID : device.uuid, devicePlatform : device.platform, deviceVersion : device.version  } };
            //var dta= { 'username': name, 'password': pwd };
            console.log("Data : "+JSON.stringify(dta));
            $.ajax({
                   url: l_url,
                   data: dta,
                   type:'POST',
                   success: function(res) {
                	   console.log("success");
                	   console.log("Response1 : "+res);
                       var responseData = $.parseJSON(res);
                       console.log("Response2 : "+responseData);
                       if(responseData.success==1){
                           //Store session id returned by the user until logout
                           var sessionID = responseData.userData.sessionID;
                           var sessionExpire = responseData.userData.sessionExpire;
                           console.log("session : "+sessionID+" "+sessionExpire);
                           try{
                               if(sessionID){
                                   if(window.localStorage.getItem("session_id")){
                                       window.localStorage.removeItem("session_id");
                                       console.log("SessionId in: "+sessionID);
                                   }
                                   console.log("SessionId : "+sessionID);
                                   window.localStorage.setItem("session_id", sessionID);
                                   if(window.localStorage.getItem("isConfigSettingSynced")){
                                	   window.localStorage.removeItem("isConfigSettingSynced"); //At login the configdata should be synced again
                                   }
                               }
                               if(sessionExpire){
                                   if(window.localStorage.getItem("session_expire")){
                                       window.localStorage.removeItem("session_expire");
                                       console.log("session expire in: "+sessionExpire);
                                   }
                                   console.log("session_expire : "+sessionExpire);
                                   window.localStorage.setItem("session_expire", sessionExpire);
                                   if(window.localStorage.getItem("isConfigSettingSynced")){
                                	   window.localStorage.removeItem("isConfigSettingSynced"); //At login the configdata should be synced again
                                   }
                               }
                           }
                           catch (e) {
                               if (e == QUOTA_EXCEEDED_ERR) {
                                   alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
                               }
                           }
                           
                           console.log("successful login");
                           addUserData(name,device);
                           //Login Response
                           console.log("successful login2");
                           logLoginAuthResponse();
                           //Navigate to home page
                           console.log("successful login3");
                           loadHome();
                           
                           //Save login credentials
                           saveLoginCredentials(name, pwd);
                       }
                       else{
                    	   console.log("login error");
                           //Show error
                           navigator.notification.alert("Err"+responseData.error+"", errSuccessCallBack, "MECARS", "OK");
                       }
                       $.mobile.hidePageLoadingMsg();
                   },
                   error: function(res,tstatus,error) {
                       var err;
                       if(res.status==0){
                           err = "Cannot connect to server, Try again later";
                       }
                       navigator.notification.alert(err+"", errSuccessCallBack, "MECARS", "OK");
                       $.mobile.hidePageLoadingMsg();
                   },
                   timeout:timeoutVal
                   });
        }
        else{
            navigator.notification.alert("Enter all fields", errSuccessCallBack, "MECARS", "OK");
        }
    }
    catch (ex)
    {
        console.log(ex.message);
    }

}

function errSuccessCallBack(){
    
}
/**************************************************************************************************/

/**************************************** HELP Action *********************************************/
function help(){
    try
    {
        navigator.notification.alert("Your username and temporary password have been preset. Please find them in your email inbox. For further help contact 800-867-5309", AlertSuccessCallBack, "MECARS", "OK");
        
    }
    catch (ex)
    {
        console.log(ex.message);
    }
    
}

function AlertSuccessCallBack(){
    
    
}
/**************************************************************************************************/

/********************************* Change Password - Settings *************************************/

var m_pwd;
var m_pwdError;

function changePassword(uname,oldPwd,newPwd){
    //var url="http://192.168.110.189:8080/testLogin.php";
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_VALIDATE_PASSWORD;
    //var l_url= "http://ryoheemecars.ap01.aws.af.cm/api/mobile/auth/change-password";
    console.log("Change Password url : "+l_url);
    
    $.mobile.showPageLoadingMsg();
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    var dta= { 'username': uname, 'old_password': oldPwd, 'new_password': newPwd, 'session_id' : sessionID };
    
    $.ajax({
           url: l_url,
           type:'POST',
           data:dta,
           success: function(res) {
               console.log("Response chng pwd: "+res);
               var responseData = $.parseJSON(res);
               if(responseData.success==1){
                    m_pwd = responseData.userData;
                    m_pwdError = 0;
                    changePwdCB();
               }
               else{
                    //return error
                    m_pwd = responseData.error;
                    m_pwdError = 1;
                    changePwdCB();
               }
                $.mobile.hidePageLoadingMsg();
        },
        error: function(res,tstatus,error) {
           console.log("Response err chng pwd: "+res.status + " tstatus : "+tstatus+" error : "+error);
           var err;
           if(res.status==0){
                err = "Cannot connect to server, Try again later";
           }
           m_pwd = err;
           m_pwdError = 1;
           changePwdCB();
           
           $.mobile.hidePageLoadingMsg();
        },
        timeout:timeoutVal
    });
}

/************************************************************************************************/

/************************************ Get Refresh Interval **************************************/

var m_intervalTime;
var m_intervalError;
function getRefreshInterval(){
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    if(navigator.network.connection.type == Connection.NONE){
    	m_intervalTime = "Cannot connect to server, Try again later";
        m_intervalError = 1;
        refreshInterval();
    }
    
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_REFRESH_INTERVAL + sessionID;
    console.log("Refresh Interval url : "+l_url);
    
    $.mobile.showPageLoadingMsg();
    
    $.ajax({
           url: l_url,
           type:'GET',
           data:"",
           success: function(res) {
               var responseData = $.parseJSON(res);
               if(responseData.success==1){
                   m_intervalTime = responseData.userData;
                   m_intervalError = 0;
                   refreshInterval();
               }
               else{
                   //return error
                   m_intervalTime = responseData.error;
                   m_intervalError = 1;
                   refreshInterval();
               }
           
                $.mobile.hidePageLoadingMsg();
           },
           error: function(res,tstatus,error) {
               var err;
               if(res.status==0){
                   err = "Cannot connect to server, Try again later";
               }
               m_intervalTime = err;
               m_intervalError = 1;
               refreshInterval();
           
                $.mobile.hidePageLoadingMsg();
           },
           timeout:timeoutVal
    });
    
}


/*************************************************************************************************/

/************************************ Get Destinations *******************************************/

var m_Destinations;
var m_DestinationError;
function getDestinations(uname){
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_DESTINATIONS + sessionID +"/"+currentLat+"/"+currentLong;
    //var l_url = "http://localhost:8080/MECARS/index.php/api/mobile/destinations/demo/23.22/33.232/1234";
    console.log("Destination url : "+l_url);
    
    $.mobile.showPageLoadingMsg();
    
    $.ajax({
           url: l_url,
           type:'GET',
           data:"",
           success: function(res) {
               var responseData = $.parseJSON(res);
               if(responseData.success==1){
                    m_Destinations = responseData.userData.destinations;
                    m_DestinationError = 0;
                    destinations();
               }
               else{
                    //return error
                    m_Destinations = responseData.error;
                    m_DestinationError = 1;
                    destinations();
               }
                $.mobile.hidePageLoadingMsg();
           
           },
           error: function(res,tstatus,error) {
               var err;
               if(res.status==0){
                    err = "Cannot connect to server, Try again later";
               }
               m_Destinations = err;
               m_DestinationError = 1;
               destinations();
           
                $.mobile.hidePageLoadingMsg();
            },
           timeout:timeoutVal
        });
    
}


/*************************************************************************************************/


/********************************* Get Frequent Tolls Locations **********************************/

var m_FrequentTolls;
var m_FrequentTollsError;
function getFrequentTolls(uname){
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_FREQUENT_TOLLS + sessionID;
    
    console.log("Frequent Tolls url : "+l_url);
    
    $.mobile.showPageLoadingMsg();
    
    $.ajax({
           url: l_url,
           type:'GET',
           data:"",
           success: function(res) {
               var responseData = $.parseJSON(res);
               if(responseData.success==1){
                   m_FrequentTolls = responseData.userData.locations;
           
                   m_FrequentTollsError = 0;
                   frequentToll();
               }
               else{
                   //return error
                   m_FrequentTolls = responseData.error;
                   m_FrequentTollsError = 1;
                   frequentToll();
               }
           
                $.mobile.hidePageLoadingMsg();
           
           },
           error: function(res,tstatus,error) {
               var err;
               if(res.status==0){
                    err = "Cannot connect to server, Try again later";
               }
               m_FrequentTolls = err;
               m_FrequentTollsError = 1;
               frequentToll();
           
                $.mobile.hidePageLoadingMsg();
           
           },
           timeout:timeoutVal
    });
    
}

/*************************************************************************************************/

/****************************** Get Start Trip Location Data *************************************/

var m_StartLocData;
var m_StartLocDataError;
function getStartLocationData(uname){
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_START_LOCATION_DATA + sessionID+"/"+currentLat+"/"+currentLong;
    console.log("Start Trip Loc url : "+l_url);
    
    $.mobile.showPageLoadingMsg();
    
    $.ajax({
           url: l_url,
           type:'GET',
           data:"",
           success: function(res) {
               var responseData = $.parseJSON(res);
               if(responseData.success==1){
                   m_StartLocData = responseData.userData.locationName;
                   m_StartLocDataError = 0;
                   getStartLocationDataCB();
               }
               else{
                   //return error
                   m_StartLocData = responseData.error;
                   m_StartLocDataError = 1;
                   getStartLocationDataCB();
               }
               $.mobile.hidePageLoadingMsg();
           
           },
           error: function(res,tstatus,error) {
               var err;
               if(res.status==0){
               err = "Cannot connect to server, Try again later";
               }
               m_StartLocData = err;
               m_StartLocDataError = 1;
               getStartLocationDataCB();
               
               $.mobile.hidePageLoadingMsg();
           },
           timeout:timeoutVal
           });
    
}

/*********************************************************************************************/

/******************************** Send new destination ***************************************/

var m_AddNewDestinationError;
function sendNewDestination(destination1,lat,lng){
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_ADD_NEW_DESTINATION;
    console.log("Add new destination url : "+l_url+" Lat Long : "+lat+" "+lng);
    $.mobile.showPageLoadingMsg();
    
    var clientId = m_clientId;
    
    var dta= { 'session_id': sessionID, 'destination': destination1, 'latitude':lat, 'longitude':lng, 'client_id':clientId };
    
    $.ajax({
           url: l_url,
           type:'POST',
           data: dta,
           success: function(res) {
               var responseData = $.parseJSON(res);
               if(responseData.success==1){
                    m_AddNewDestinationError = 0;
                    sendNewDestinationCB();
               }
               else{
                    m_AddNewDestinationError = 1;
                    sendNewDestinationCB();
               }
               $.mobile.hidePageLoadingMsg();
           },
           error: function(res,tstatus,error) {
               var err;
               if(res.status==0){
                    err = "Cannot connect to server, Try again later";
               }
               m_AddNewDestinationError = 1;
               sendNewDestinationCB();
               
               $.mobile.hidePageLoadingMsg();
           },
           timeout:timeoutVal
           });
    
}

/*********************************************************************************************/

/********************************** Send new address *****************************************/

var m_AddNewAddressData;
var m_AddNewAddressError;
function sendNewAddressRequest(uname,address,city,zip,state,type){
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_ADD_NEW_ADDRESS_REQUEST;
    console.log("Add new address url : "+l_url);
    $.mobile.showPageLoadingMsg();
    
    var dta= { 'session_id': sessionID, 'address': address, 'city':city, 'zip':zip, 'state':state, 'type':type };
    
    $.ajax({
           url: l_url,
           type:'POST',
           data: dta,
           success: function(res) {
               var responseData = $.parseJSON(res);
               if(responseData.success==1){
                   m_AddNewAddressData = responseData.userData;
                   m_AddNewAddressError = 0;
                   updateAddressCB();
               }
               else{
                   //return error
                   m_AddNewAddressData = responseData.error;
                   m_AddNewAddressError = 1;
                   updateAddressCB();
               }
               $.mobile.hidePageLoadingMsg();
           },
           error: function(res,tstatus,error) {
               var err;
               if(res.status==0){
                   err = "Cannot connect to server, Try again later";
               }
               m_AddNewAddressData = err;
               m_AddNewAddressError = 1;
               updateAddressCB();
               $.mobile.hidePageLoadingMsg();
           },
           timeout:timeoutVal
        });
    
}

/*********************************************************************************************/

/******************************* Send Trip Activity Data *************************************/

var m_ActivityData;
var m_ActivityError;
function syncActivityData(l_data){
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_SYNC_TRIP_DATA;
    console.log("Sync url : "+l_url);
    console.log("Trip Data length : "+SYNC_TRIP_DATA.length);
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    
    if(l_data){
        var dta= { 'session_id': sessionID, 'trip_data': l_data };
        
        var length = dta.trip_data.length;
        
        for(var i =0 ;i< length ; i++){
        	if(dta.trip_data[i].activity == "Trip"){
        		console.log("Ajmal: Sync Trip data" + JSON.stringify(dta.trip_data[i]));
        	}
        }
        
        var jsonAsString2 = JSON.stringify(dta);
        
        console.log(" LOG : Sync Trip Data string : "+jsonAsString2);
        
        if(sessionID){
            $.mobile.showPageLoadingMsg();
            $.ajax({
                   url: l_url,
                   type:'POST',
                   data:dta,
                   success: function(res) {
                	   console.log("Sync response" + res);
                	   try{
                       var responseData = $.parseJSON(res);
                       if(responseData.success==1){
                           m_ActivityData = responseData.userData;
                           m_ActivityError = 0;
                           console.log("Sync trip completed successfully");
                           syncActivityDataCB(m_ActivityData);
                           
                       }
                       else{
                           //return error
                           m_ActivityData = responseData.error;
                           m_ActivityError = 1;
                           // alert("Server error occured. Please try again later");
                           console.log("Sync trip error : "+responseData.error);
                       }
                	   }catch(err){
                		   console.log();
                	   }
                       $.mobile.hidePageLoadingMsg();
                   },
                   error: function(res,tstatus,error) {
                       var err;
                       if(res.status==0){
                           err = "Cannot connect to server, Try again later";
                       }
                       m_ActivityData = err;
                       m_ActivityError = 1;
                       console.log("Sync trip server error : "+err);
                       $.mobile.hidePageLoadingMsg();
                   },
                   timeout:timeoutVal
                });
        }
    }
    
}

/*********************************************************************************************/

/********************************* Send Settings Data ****************************************/

var m_SettingsData;
var m_SettingsError;
function syncConfigSettingsData(l_data){
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_SYNC_SETTINGS_DATA;
    console.log("Sync url : "+l_url);
    console.log("Trip Data length : "+SYNC_TRIP_DATA.length);
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    var dta = { 'session_id': sessionID, 'settings_data': l_data };
    
    var jsonAsString2 = JSON.stringify(dta);
    
    console.log("Sync Settings Data string : "+jsonAsString2);
    
    
     $.mobile.showPageLoadingMsg();
     $.ajax({
         url: l_url,
         type:'POST',
         data:dta,
         success: function(res) {
             var responseData = $.parseJSON(res);
             if(responseData.success==1){
                 m_SettingsData = responseData.userData;
                 m_SettingsError = 0;
                 //syncConfigSettingsDataCB();
                 console.log("Sync setting completed successfully");
            
                //If sync successfull save the sync config state and dont sync until next login
                if(!window.localStorage.getItem("isConfigSettingSynced")){
                    window.localStorage.setItem("isConfigSettingSynced", 1);
                }
             }
             else{
                 //return error
                 m_SettingsData = responseData.error;
                 m_SettingsError = 1;
                 //syncConfigSettingsDataCB();
                 console.log("Sync setting error : "+responseData.error);
             }
             $.mobile.hidePageLoadingMsg();
         },
         error: function(res,tstatus,error) {
             var err;
             if(res.status==0){
                err = "Cannot connect to server, Try again later";
             }
             m_SettingsData = err;
             m_SettingsError = 1;
             //syncConfigSettingsDataCB();
             console.log("Sync setting server error");
             $.mobile.hidePageLoadingMsg();
         },
         timeout:timeoutVal
     });
     
    
}

/*********************************************************************************************/

/********************************* Send Feedback ****************************************/

var m_FeedbackData;
var m_FeedbackError;
function sendFeedback(uname, desc,feature,type){
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_SEND_FEEDBACK;
    console.log("Feedback url : "+l_url);
    console.log("Feedback Feature : "+feature+" , Type : "+type);
    
    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    
    var dta= { 'session_id': sessionID, 'feedback_desc': desc,'feedback_feature': feature,'feedback_type': type  };
    
     $.mobile.showPageLoadingMsg();
     $.ajax({
         url: l_url,
         type:'POST',
         data: dta,
         success: function(res) {
        	 console.log("Feed back response"+res);
             var responseData = $.parseJSON(res);
             if(responseData.success==1){
                 m_FeedbackData = responseData.userData;
                 m_FeedbackError = 0;
                 sendFeedbackToServerCB();
             }
             else{
                 //return error
                 m_FeedbackData = responseData.error;
                 m_FeedbackError = 1;
                 sendFeedbackToServerCB();
             }
             $.mobile.hidePageLoadingMsg();
         },
         error: function(res,tstatus,error) {
             var err;
             if(res.status==0){
                 err = "Cannot connect to server, Try again later";
             }
             m_FeedbackData = err;
             m_FeedbackError = 1;
             sendFeedbackToServerCB();
             $.mobile.hidePageLoadingMsg();
         },
         timeout:timeoutVal
     });
}

/*********************************************************************************************/

/********************************* Get Client Data ****************************************/


function getClientListAPI(){
    //    var sessionID = 0;
    if(window.localStorage.getItem("session_id"))
        sessionID = window.localStorage.getItem("session_id");
    
    var l_url= url + SETTINGS.ENTERPRISE_SERVICE_URL_CLIENTS + sessionID;
    //var l_url = "http://localhost:8080/MECARS/index.php/api/mobile/clients/demo/23.22/33.232/1234";
    console.log("Client list url : "+l_url);
    
    $.mobile.showPageLoadingMsg();
    
    $.ajax({
           url: l_url,
           type:'GET',
           data:"",
           success: function(res) {
           
               var responseData = $.parseJSON(res);
               var data;
               var err;
               if(responseData.success==1){
                   data = responseData.userData.clients;
                   err = 0;
                   clientListCB(data,err);
               }
               else{
                   //return error
                   data = responseData.error;
                   err = 1;
                   clientListCB(data,err);
               }
           console.log("Response : "+res+" Length : "+data.length);
               $.mobile.hidePageLoadingMsg();
           
           },
           error: function(res,tstatus,error) {
               var err;
               var data;
               if(res.status==0){
                    err = "Cannot connect to server, Try again later";
               }
               m_Destinations = err;
               m_DestinationError = 1;
               clientListCB(data,err);
               
               $.mobile.hidePageLoadingMsg();
           },
           timeout:timeoutVal
           });
}


/*********************************************************************************************/
