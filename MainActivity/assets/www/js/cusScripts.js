var selectedLocationID;
/************************************* Body OnLoad function **************************************/

function bodyLoad(){
    
}

/*************************************************************************************************/

/****************************************** Log Events *******************************************/

function logLogin(){
    
    /** Initiate Login Activity **/
    var cDate = new Date();
    
    var activityData1 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 0,
        level : 0,
        activityTypeID : 1,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        isParent : 1,
        parentName : "Login"
    };
    //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
    
    
    queue.activity.push(activityData1);
    console.log(" activity : "+queue.activity[0].activityTypeID);
    startAddAct();
    /*****************************/
    
}

function logLoginAuthRequest(){
    
    var cDate = new Date();
    
    var activityData2 = {
    //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 1,
        activityTypeID : 2,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        isParent : 0
    };
    
    queue.activity.push(activityData2);
    startAddAct();
    
    //getLocationAndAddData(activityData);
    
}

function logLoginAuthResponse(){
    
    var cDate = new Date();
    
    var activityData3 = {
    //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 1,
        activityTypeID : 3,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    
    queue.activity.push(activityData3);
    startAddAct();
    
    //getLocationAndAddData(activityData);
    
}

function logTrip(name,id){
    
    var cDate = new Date();
    
    var activityData4 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 0,
        activityTypeID : 500,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 1,
        parentName : "Trip",
        locationName:name,
        selectedLocationId:id 
    };
    queue.activity.push(activityData4);
    startAddAct();
    
    //getLocationAndAddData(activityData);
    
}

function logStartTrip(){
    
    var cDate = new Date();
    
    var activityData5 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 1,
        activityTypeID : 501,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    
    queue.activity.push(activityData5);
    startAddAct();
    
    //getLocationAndAddData(activityData);
    
}

function logOngoingTripLocation(){
    
    var cDate = new Date();
    
    var activityData5 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 1,
        activityTypeID : 502,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    
    queue.activity.push(activityData5);
    startAddAct();
    
    //getLocationAndAddData(activityData);
    
}

function logStopTrip(){
    
    var cDate = new Date();
    
    var activityData6 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 1,
        activityTypeID : 503,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    
    queue.activity.push(activityData6);
    startAddAct();
        
}

function logConfirmTrip(name,selectedEndLocationId){
    
    var cDate = new Date();
    
    var activityData31 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 1,
        activityTypeID : 504,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0,
        locationName:name,
        selectedLocationId:selectedEndLocationId
    };
    
    queue.activity.push(activityData31);
    startAddAct();
    
}

function logToll(){
    
    var cDate = new Date();
    
    var activityData7 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 0,
        activityTypeID : 1500,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 1
    }
    
    queue.activity.push(activityData7);
    startAddAct();
    
}

function logAddToll(){
    
    var cDate = new Date();
    
    var activityData8 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 1,
        activityTypeID : 1501,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    
    queue.activity.push(activityData8);
    startAddAct();
    
}

function logNotes(){
    
    var cDate = new Date();
    
    var activityData9 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 0,
        activityTypeID : 2000,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 1
    }
    
    queue.activity.push(activityData9);
    startAddAct();
    
}

function logAddNotes(){
    
    var cDate = new Date();
    
    var activityData10 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 1,
        activityTypeID : 2001,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    
    queue.activity.push(activityData10);
    startAddAct();
    
}

function logSynActivity(){
    
    var cDate = new Date();
    
    var activityData11 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 0,
        activityTypeID : 3000,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 1,
        parentName : "Enterprise Synchronization"
    }
    
    queue.activity.push(activityData11);
    startAddAct();
    
    
}

function logDeviceTelemetry(){
    var cDate = new Date();
    var activityData12 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 0,
        activityTypeID : 4000,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 1,
        parentName : "Device Telemetery"
    }
    queue.activity.push(activityData12);
    startAddAct();
}

function logDeviceTelemetryPause(){
    var cDate = new Date();
    var activityData13 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 0,
        level : 1,
        activityTypeID : 4001,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    queue.activity.push(activityData13);
    startAddAct();
}

function logDeviceTelemetryResume(){
    var cDate = new Date();
    var activityData14 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 0,
        level : 1,
        activityTypeID : 4002,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    queue.activity.push(activityData14);
    startAddAct();
}

function logDeviceTelemetryOnline(){
    var cDate = new Date();
    var activityData15 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 0,
        level : 1,
        activityTypeID : 4003,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    queue.activity.push(activityData15);
    startAddAct();
}

function logDeviceTelemetryOffline(){
    var cDate = new Date();
    var activityData16 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 0,
        level : 1,
        activityTypeID : 4004,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 0
    }
    queue.activity.push(activityData16);
    startAddAct();
}

function logAutoLogin(){
    var cDate = new Date();
    var activityData17 = {
        //Set activity data values to be logged here, and update it after adding location data
        parent : 1,
        level : 0,
        activityTypeID : 5000,
        remarks : "",
        startDate : cDate,
        endDate : cDate,
        
        //Check whether the added activity is parent or subtype. Therfore, set these in order to set the parent id corresponding to different types
        isParent : 1,
        parentName : "Auto Login"
    }
    queue.activity.push(activityData17);
    startAddAct();
}

/*************************************************************************************************/

/******************************************* Navigation ******************************************/

var currentPageId = "";

function loadCurrentPage(page){
    //Navigate to settings screen
    $.mobile.loadPage( page, {
                        transition: "slide",
                        reverse: false
                        });
    
    currentPageId = page;
    
}

function loadSettings(){
    //Navigate to settings screen 
    $.mobile.changePage( "#settingsPage", {
                        transition: "slide",
                        reverse: false
                        });
    
    currentPageId = "#settingsPage";

}

function loadSettingsChangePwd(){
	document.getElementById('oldPwdID').value = "";
    document.getElementById('newPwdID').value = "";
    document.getElementById('confirmPwdID').value = "";
    //Navigate to change password settings screen 
    $.mobile.changePage( "#settingsChangePwdPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#settingsChangePwdPage";
}

function loadSettingsHomeAddress(){
    //Navigate to home address settings screen 
    $.mobile.changePage( "#homeAddressPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#homeAddressPage";
    
}

function loadSettingsWorkAddress(){
    //Navigate to work address settings screen 
    $.mobile.changePage( "#workAddressPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#workAddressPage";
    
}

function loadSettingsTollSetup(){
    //Navigate to toll setup settings screen 
    $.mobile.changePage( "#tollSetupPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#tollSetupPage";
}

function loadSettingsTripStorage(){
    //Navigate to trip storage settings screen 
    $.mobile.changePage( "#tripStoragePage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#tripStoragePage";
}

function backChangePwdAction(){
    //Navigate back to change password settings screen 
    $.mobile.changePage( "#settingsPage", {
                        transition: "slide",
                        reverse: true
                        });
    currentPageId = "#settingsPage";
}

function backEndTripAction(){
    //Navigate back to home screen
    $.mobile.changePage("#homePage", {
                        transition: "slide",
                        reverse: true
                        });
    currentPageId = "#homePage";
}

function backUnconfirmedTripAction(){
    
    cancelEditTripLogs("Unconfirmed",instertedTripID);
    
    //Navigate back to home screen
    $.mobile.changePage("#homePage", {
                        transition: "slide",
                        reverse: true
                        });
    currentPageId = "#homePage";
}

function backTollAction(){
    
    //Navigate back to home screen
    $.mobile.changePage("#endTripPage", {
                        transition: "slide",
                        reverse: true
                        });
    currentPageId = "#endTripPage";
}

function backAddTollAction(){
    if(isShowToll == 1){
        var pID = PARENT_ACTIVITY_ID.tempTripActivityParentID;
        showTolls(pID);
        
        //Navigate back to add toll screen
        $.mobile.changePage("#tollsPage", {
                            transition: "slide",
                            reverse: true
                            });
        currentPageId = "#tollsPage";
    }
    else{
        showTripLogs();
        //Navigate to trip logs screen 
        $.mobile.changePage( "#myTripLogsPage", {
                            transition: "slide",
                            reverse: true
                            });
        currentPageId = "#myTripLogsPage";
    }
    
}

function backAddNotesAction(){
    if(isShowNote==1){
        var pID = PARENT_ACTIVITY_ID.tempTripActivityParentID;
        showNotes(pID);
        //Navigate back to add notes screen
        $.mobile.changePage("#notesPage", {
                            transition: "slide",
                            reverse: true
                            });
        currentPageId = "#notesPage";
    }
    else{
        showTripLogs();
        //Navigate to trip logs screen 
        $.mobile.changePage( "#myTripLogsPage", {
                            transition: "slide",
                            reverse: true
                            });
        currentPageId = "#myTripLogsPage";
    }

    
}

function loadEndTrip(){
    /*$('#searchBarID .ui-input-text').val("");   //Empty the input box at load
    getDestinationsData();  //Get Destinations data which will be used for search basis
    getClientList();    //Get list of clients available
    document.getElementById('addedDestinationID').style.display="none";
    document.getElementById('searchBarID').style.display="";*/
    
	//populate the list from location table
	
	
    //Navigate to END_TRIP screen 
    $.mobile.changePage("#endTripPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#endTripPage";
}

function loadHome(){
    console.log("log home");
    document.getElementById('cancelTripButtonID').style.display = "none";
    document.getElementById('testLocactionID').style.display = "none";
    document.getElementById('distanceID').style.display = "none";
    
    //document.getElementById('addLocationID').value = "";
    
    //Navigate to home screen 
    $.mobile.changePage( "#homePage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#homePage";
    //Start All Sync
    startSync();
    
}

function loadAddNotes(){
    emptyAddNotesValues();
    
    //Navigate to add notes screen 
    $.mobile.changePage( "#addNotesPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#addNotesPage";
}

function loadNotes(){
    logNotes();
    
    //Navigate to notes screen 
    $.mobile.changePage( "#notesPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#notesPage";
    var pID = PARENT_ACTIVITY_ID.tripActivityParentID;
    showNotes(pID);
    
    isShowNote = 1;
}

function loadTolls(){
    logToll();
    
    //Navigate to tolls screen 
    $.mobile.changePage( "#tollsPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#tollsPage";
    var pID = PARENT_ACTIVITY_ID.tripActivityParentID;
    showTolls(pID);
    
    isShowToll = 1;
}

function loadAddTolls(){
    emptyAddTollValues();
    //Navigate to add tolls screen 
    $.mobile.changePage( "#addTollsPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#addTollsPage";
    getFrequentTollData();
    
}

function loadTripLogs(){
    showTripLogs();
    
    //Navigate to trip logs screen 
    $.mobile.changePage( "#myTripLogsPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#myTripLogsPage";
}

function loadEditTripLogs(){
    //Navigate to edit trip logs screen 
    $.mobile.changePage( "#editMyTripLogsPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#editMyTripLogsPage";
}

function backEditMyTripAction(){
    showTripLogs();
    
    //Navigate back to trip logs screen 
    $.mobile.changePage( "#myTripLogsPage", {
                        transition: "slide",
                        reverse: true
                        });
    currentPageId = "#myTripLogsPage";
}

function loadDailyCommutes(){
    //Navigate to daily commutes screen 
    $.mobile.changePage( "#dailyCommutesPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#dailyCommutesPage";
}

function logout(){
    //Set session and all other things as null here on logout

    if(isStartTrip){
        stopWatchInterval();
        
        window.plugins.localNotification.cancelAll();
        
        $('#startStopButtonID').buttonMarkup({theme: 'g'});
        //Change the state of the trip button
        document.getElementById('startStopId').innerHTML = "Start Trip";
        
        //Hide the Cancel button and other log labels
        document.getElementById('cancelTripButtonID').style.display = "none";
        document.getElementById('testLocactionID').style.display = "none";
        document.getElementById('distanceID').style.display = "none";
        
        isStartTrip = 0;      
        
    }
    //Navigate to login screen at logout
    $.mobile.changePage( "#loginPage", {
                        transition: "slide",
                        reverse: true
                        });
    currentPageId = "#loginPage";
}

var feedbackPageName;

function loadFeedback(screen,page){
    
    document.getElementById('feedbackTypeTitleID').innerHTML = screen;
    feedbackPageName = page;
    
    //Navigate to feedback screen 
    $.mobile.changePage( "#feedbackPage", {
                        transition: "slide",
                        reverse: false
                        });
    currentPageId = "#feedbackPage";
}

function backFeedback(){
    //Navigate back from feedback screen
    $.mobile.changePage( "#"+feedbackPageName+"", {
                        transition: "slide",
                        reverse: true
                        });
    currentPageId = "#"+feedbackPageName+"";
}

/**************************************************************************************************/

/**************************************** Get Current Date ****************************************/

function getCurrentDate(){
    return new Date();
}

/**************************************************************************************************/

/***************************************** Change Password ****************************************/

function changePwd(){
    var element = document.getElementById('oldPwdID').value;
    if (typeof element !== "undefined" && element.value != '') {
            testPassword(document.getElementById('newPwdID').value,document.getElementById('confirmPwdID').value);
        
    }
    else{
        alert("Incorrect Password");
    }
    
}

function testPassword(pwd,confirmPwd){
    var patt1= /(^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[\W]).*$)/
    if(!(patt1.test(pwd))){
        try{
            navigator.notification.alert("Please enter password with specifications", errSuccessCallBack, "MECARS", "OK");
            
        }
        catch (ex){
            console.log(ex.message);
        }
        
    }
    else{
        var confirm = confirmPassword(pwd,confirmPwd);
        if(confirm){
            try{
                changePassword(usernameDB,document.getElementById('oldPwdID').value,pwd);
            }
            catch (ex){
                console.log(ex.message);
            }
        }
        else{
            try{
                navigator.notification.alert("Please confirm your password again", errSuccessCallBack, "MECARS", "OK");
            }
            catch (ex){
                console.log(ex.message);
            }
            
        }
    }
    
}

function confirmPassword(pwd,confirmPwd){
    if(pwd == confirmPwd){
        return true;
    }
    else
        return false;
}

function changePwdCB(){
    alert(m_pwd);
    
}

//Error Callback
function errSuccessCallBack(){
    
    
}

/*************************************************************************************************/

/*********************************** Start - End Trip Action *************************************/

var interval;

function startTrip(){
    
    var trip = document.getElementById('startStopId').innerHTML;
    if(trip=="Start Trip"){
    	
        
        batteryPlugged = 0;
        
        var loc = "";
        addTripLogAtStart($("#addLocationID").val());
        
    }
    else{
        document.getElementById('cancelTripButtonID').style.display = "none";
        document.getElementById('testLocactionID').style.display = "none";
        document.getElementById('distanceID').style.display = "none";
        
        isStartTrip = 0;
        startTripTime = 0;
        endTrip();
        //Log Complete Trip
        logStopTrip();
        
        //clearCallLocalNotification();
    }
}

function addTripLogAtStart(loc){
    
    console.log("Start Loc : "+loc);
    //here get the location from search box
  //hide the list & Search box
	
    if(loc){
    	$("#addLocationID").hide();
    	$("#startLocationList").hide();
        //callLocalNotification();
        
        //Initialize time and distance at start trip
        timeBWTrips = 0;
        distanceBWTrips = 0;
        startTripLat = 0;
        startTripLong = 0;
        
        document.getElementById('cancelTripButtonID').style.display = "";
        document.getElementById('testLocactionID').style.display = "";
        document.getElementById('distanceID').style.display = "";
        
        startLocationName = loc;
        selectedLocationID = -1;
        //Start Trip
        isStartTrip = 1;
        document.getElementById('testLocID').innerHTML = "";
        document.getElementById('distanceTravelledID').innerHTML = "";
        document.getElementById('timeTravelledID').innerHTML = "";
        timeCalled = 0;
        
        // check the strat location  entered  is new_one or selct from list 
        checkLocation(loc);
        
        //  if new_one insert the location in to  local_db
        // if want to avoid name duplication call checkLocation()
        
        //Log Trip 
        /*logTrip(loc);
        
        //Log Start Trip
        logStartTrip();
        getRefreshInterval();*/
        
    }
    else{
        alert("Please add a location");
        //getStartLocationDataReq();
    }
}

function checkLocationCB(locationId,locationName){
		console.log("LOG: checkCB id"+ locationId);
		if(locationId == -1){
			selectedLocationID = -1;
			logTrip(locationName,selectedLocationID);
	    }else{
	    	selectedLocationID = locationId;
			logTrip("Null",selectedLocationID);
	    }
		logStartTrip();
	    getRefreshInterval();
}
function cancelTrip(){
    var trip = document.getElementById('startStopId').innerHTML;
    if(trip=="Complete Trip"){
        MY_TRIP.activityID = PARENT_ACTIVITY_ID.tripActivityParentID;
        MY_TRIP.distance = "";
        MY_TRIP.status = "Cancelled";
        MY_TRIP.cost = "";
        MY_TRIP.destinationName = "";
        MY_TRIP.locationName = startLocationName;    
        
        navigator.notification.confirm("Confirm cancel", function confirmCB(button){
                                     if(button==1){
                                       window.plugins.localNotification.cancelAll();
                                       
                                        $('#startStopButtonID').buttonMarkup({theme: 'g'});
                                        //Change the state of the trip button
                                        document.getElementById('startStopId').innerHTML = "Start Trip";
                                     
                                        $("#addLocationID").show();
                                    	$("#startLocationList").show();
                                        
                                        //Hide the Cancel button and other log labels 
                                        document.getElementById('cancelTripButtonID').style.display = "none";
                                        document.getElementById('testLocactionID').style.display = "none";
                                        document.getElementById('distanceID').style.display = "none";
                                     
                                        isStartTrip = 0;
                                        //In case of Watch Position API
                                        //navigator.geolocation.clearWatch(watch_id);
                                     
                                        //OR in case of Get Position API
                                        stopWatchInterval();
                                        ////////////////
                                        cancelTripDetails(MY_TRIP); // cancel the trip
                                        //Clear Local notification call interval
                                        clearCallLocalNotification();
                                     
                                     }
                                }, "MECARS", 'YES,NO');
    }
}

function endTrip(){
    window.plugins.localNotification.cancelAll();
    
    $('#startStopButtonID').buttonMarkup({theme: 'g'});
    document.getElementById('startStopId').innerHTML = "Start Trip";
    // Stop tracking the user
    $("#addLocationID").show();
	$("#startLocationList").show();
    //In case of Watch Position API
    //navigator.geolocation.clearWatch(watch_id);
    
    //OR in case of Get Position API
    stopWatchInterval();
    
    loadEndTrip();
}

function confirmTrip(){
    
    //if(clientName){
        if($('#addEndLocationID').val()){
            
        	var endLocationName = $('#addEndLocationID').val();
        	// check the location already exist or insert it
        	checkEndLocation(endLocationName);
        	
            
           
            MY_TRIP.destinationName = $('#addEndLocationID').val();
            
            
            //document.getElementById('addLocationID').value = "";
            
            MY_TRIP.locationName = startLocationName;
            MY_TRIP.activityID = PARENT_ACTIVITY_ID.tripActivityParentID;
            MY_TRIP.distance = distanceBWTrips;
            MY_TRIP.status = "Pending";
            MY_TRIP.clientName = clientName;
            getTotalTripCost(MY_TRIP.activityID);
        }
        else{
            alert("Please choose destination");
        }
    //}
    //else{
    //    alert("Please add client information");
    //}
    
    
}

function checkEndLocationCB(locationId,locationName){
	console.log("LOG: checkCB id"+ locationId);
	if(locationId == -1){
		selectedEndLocationID = -1;
		//
		logConfirmTrip(locationName,selectedEndLocationID);
	}else{
    	selectedEndLocationID = locationId;
    	logConfirmTrip("Null",selectedEndLocationID);
    }
	
}

function recordAsPersonalTrip(){
    if(MY_TRIP.destinationName){
        updateTripType("Personal",instertedTripID);
    }
    else{
        alert("Please choose destination");
    }
}

function updateTripTypeCB(){
    navigator.notification.alert("Trip Recorded as Personal", function confirmCB(button){
                                    backEndTripAction();
                                 }, "MECARS", 'OK');

}

function getTotalTripCostCB(){
    
    
    saveClientInfo(MY_TRIP);
    
    navigator.notification.alert("Trip Confirmed", function confirmCB(button){
                                 backEndTripAction();
                               }, "MECARS", 'OK');
    
    
    
}

/**
 //In case of calling watch position API

function refreshInterval(){
    if(!m_intervalError){
        watchLocation(m_intervalTime);
        document.getElementById('startStopId').innerHTML = "Complete Trip";
        console.log("Refresh Interval : "+m_intervalTime);
    }
    else{
        alert(m_intervalTime);
    }
}
 
 **/

//In case of calling getCurrentPosition API after some interval

var watchInterval;

function refreshInterval(){
    
	document.getElementById('startStopId').innerHTML = "Complete Trip";
        //For coloring to blue
    $('#startStopButtonID').buttonMarkup({theme: 'b'});
    getWatchLocation();
    if(!m_intervalError){
        console.log("Refresh Interval : "+m_intervalTime);
        
        watchInterval = setInterval(function getPositionAfterInterval(interval){
                                            getWatchLocation();
                                    
                                    
                                    },m_intervalTime);
    }
    else{
        //alert(m_intervalTime);
        
        //window.plugins.localNotification.cancelAll();
        
        /*$('#startStopButtonID').buttonMarkup({theme: 'g'});
        //Change the state of the trip button
        document.getElementById('startStopId').innerHTML = "Start Trip";
        
        //Hide the Cancel button and other log labels
        document.getElementById('cancelTripButtonID').style.display = "none";
        document.getElementById('testLocactionID').style.display = "none";
        document.getElementById('distanceID').style.display = "none";
        
        isStartTrip = 0;*/
    	watchInterval = setInterval(function getPositionAfterInterval(interval){
            getWatchLocation();
    
    
    	},30000);
    }
}

function stopWatchInterval(){
    clearInterval(watchInterval);
    
}


/*************************************************************************************************/

/************************************* Get/Set Destinations **************************************/

function getDestinationsData(){
    $('#searchBarID ul').html("");
    getDestinations(usernameDB);
}

function destinations(){
    /*
    if(!m_DestinationError){
        for(var i=0; i<m_Destinations.length; i++){
            $('#searchBarID ul').append("<li style=\"text-transform:capitalize\"><a style=\"font-size:12px; white-space: pre-wrap\" href=\"javascript:selectedDestination(m_Destinations["+i+"])\">"+m_Destinations[i]+"</a></li>");
        }
        
        refresh("#searchBarID ul");
        
        //document.getElementById('searchBarID').innerHTML = "Complete Trip";
    }
    else{
        alert(m_Destinations);
    }
     */
    if(!m_DestinationError){
        for(var i=0; i<m_Destinations.length; i++){
            if(m_Destinations[i].destination_name!=""){
                $('#searchBarID ul').append("<li style=\"text-transform:capitalize\"><a style=\"font-size:12px; white-space: pre-wrap\" href=\"javascript:selectedDestination(m_Destinations["+i+"].destination_name,m_Destinations["+i+"].client_id)\">"+m_Destinations[i].destination_name+"</a></li>");
            }
        }
        
        refresh("#searchBarID ul");
        
        //document.getElementById('searchBarID').innerHTML = "Complete Trip";
    }
    else{
        alert(m_Destinations);
    }
    
}

refresh = function (selector)
{
    try
    {
        //this may throw an exception:
        //  call methods on listview prior to initialization; attempted to call method 'refresh'
        $(selector).listview('refresh');
    }
    catch (e)
    {
    }
}

var destinationClientID = 0;

function selectedDestination(destination,clientId){
    //alert("Destiny : "+destination)
    //$('.ui-input-text').val(destination);
    
    console.log("selected client : "+clientId);
    
    MY_TRIP.destinationName = destination;
    
    clientName = "";
    destinationClientID = clientId;
    
    document.getElementById('addNewDestinationButtonID').style.display = "none";
    document.getElementById('addClientListEndTripID').style.display = "none";
    
    document.getElementById('addedDestinationID').style.display="";
    document.getElementById('searchBarID').style.display="none";
    document.getElementById('selectedDestinationID').innerHTML = destination;
    
}

function selectDifferentDestination(){
    
    document.getElementById('addNewDestinationButtonID').style.display = "";
    document.getElementById('addClientListEndTripID').style.display = "";
    
    MY_TRIP.destination = "";
    
    document.getElementById('addedDestinationID').style.display="none";
    document.getElementById('searchBarID').style.display="";
    document.getElementById('selectedDestinationID').innerHTML = "";
    
}

var newDestination;

function addNewDestination(){
    newDestination = $('#searchBarID .ui-input-text').val();
    if(newDestination){
        console.log(newDestination);
        getDestinationLatLng(newDestination);
    }
    else{
        alert("Enter New Destination");
    }
}

function getDestinationLatLng(destination1){
    var destinationLat;
    var destinationLng;
    navigator.geolocation.getCurrentPosition(function onSuccess(position){
                         destinationLat = position.coords.latitude;
                         destinationLng = position.coords.longitude;
                         sendNewDestination(destination1,destinationLat,destinationLng);
                    },
                    function geolocationError(error){
                         console.log("Error :"+error.message);
                         
                    },{enableHighAccuracy: true});
}

function sendNewDestinationCB(){
    if(!m_AddNewDestinationError){
        MY_TRIP.destinationName = newDestination;
        alert("Successfully Added");
    }
    else
        alert("An error occured please try again later");
}

/*************************************************************************************************/

/**************************************** Add Activity *******************************************/

var isActivityCompleted = 1;
var activityInterval;

function startAddAct(){
    clearInterval(activityInterval);
    activityInterval = setInterval(function(){
                                   //console.log("In pop activity");
                                   //if(isActivityCompleted){
                                       if(queue.activity.length){
                                           isActivityCompleted = 0;
                                           getLocationAndAddData(queue.activity[0]);
                                           console.log("activities : "+queue.activity);
                                           console.log("Removed activity : "+queue.activity[0].activityTypeID);
                                           queue.activity.splice(0,1);
                                           console.log("after slice activities : "+queue.activity);
                                       }
                                       else{
                                           clearInterval(activityInterval);
                                       }
                                   //}
                                   
                                },200);
    console.log("Interval started");
}

/*****************************************************************************************************/

/************************************* Get/Set Frequent Tolls **************************************/

function checkConnection() {
    var networkState = navigator.network.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    if(states[networkState]!=Connection.NONE){
        getFrequentTolls(usernameDB);
    }
    else{
        getAllTollData();
    }
    
}

function getFrequentTollData(){
    checkConnection();
}

function frequentToll2(){
    
    var date = new Date();
    
    document.getElementById('tollDateID').value = (date.getMonth()+1) + "/"+date.getDate()+"/"+date.getFullYear();
    
    for(var i=0; i<TOLLS.length; i++){
        $('#addTollLocationsID ul').append("<li><a style=\"font-size:10px\" href=\"javascript:selectedLocation2(TOLLS["+i+"].location,"+i+")\">"+TOLLS[i].location+"</a></li>");
    }
    
    refresh("#addTollLocationsID ul");

    
}

function selectedLocation2(location,id){
    document.getElementById('tollLocationID').value = location;
    document.getElementById('tollNameID').value = TOLLS[id].name;
    document.getElementById('tollCostID').value = TOLLS[id].cost;
    
}

function frequentToll(){
    
    var date = new Date();
    
    document.getElementById('tollDateID').value = (date.getMonth()+1) + "/"+date.getDate()+"/"+date.getFullYear(); 
    
    if(!m_FrequentTollsError){
        for(var i=0; i<m_FrequentTolls.length; i++){
            if(m_FrequentTolls[i].location!=""){
                $('#addTollLocationsID ul').append("<li><a style=\"font-size:10px\" href=\"javascript:selectedLocation(m_FrequentTolls["+i+"].location,"+i+")\">"+m_FrequentTolls[i].location+"</a></li>");
            }
        }
        
        refresh("#addTollLocationsID ul");
        
    }
    else{
        alert("Error :" + m_FrequentTolls);
    }
    
}

function selectedLocation(location,id){
    document.getElementById('tollLocationID').value = location;
    document.getElementById('tollNameID').value = m_FrequentTolls[id].name;
    document.getElementById('tollCostID').value = m_FrequentTolls[id].cost;
    
}



/**********************************************************************************************************/

/******************************** Date/Number Validity Check **********************************************/

$(document).ready(function() {
                  $('.isNumericFormat').keyup(function () {
                                        this.value = this.value.replace(/[^0-9\.]/g,'');
                    });
});

function checkDateValidity(date){
    // regular expression to match required date format
    re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if(date != '') {
        if(regs = date.match(re)) {
            // day value between 1 and 31
            if(regs[2] < 1 || regs[2] > 31) {
                alert("Invalid value for day: " + regs[2]);
                return false;
            }
            // month value between 1 and 12
            if(regs[1] < 1 || regs[1] > 12) {
                alert("Invalid value for month: " + regs[1]);
                return false;
            }
            // year value between 1902 and 2012
            if(regs[3] < 1902 || regs[3] > (new Date()).getFullYear()) {
                alert("Invalid value for year: " + regs[3] + " - must be between 1902 and " + (new Date()).getFullYear());
                return false;
            }
            return true;
        }
        else {
            alert("Invalid date format: " + date);
            return false;
        }
    }
    else{
        return false;
    }
}


/**********************************************************************************************************/

/***************************************** Add/Show Toll **************************************************/

function emptyAddTollValues(){
    $('#tollNameID').val("");
    $('#tollCostID').val("");
    $('#tollDateID').val("");
    $('#tollLocationID').val("");
    $('#addTollLocationsID ul').html("");
    
}

function saveTollAction(name,cost,date,location){
    TOLL.name = name;
    TOLL.cost = cost;
    TOLL.date = date;
    
    if(location=="Frequently used Toll Locations"){
        alert("Please Select toll location");
    }
    else{
        if(name==""){
            alert("Please enter toll name");
        }
        else{
            if(cost==""){
                alert("Please enter toll cost");
            }
            else{
                if(date==""){
                    alert("Please enter toll date");
                }
                else{
                    
                    if(checkDateValidity(date)){
                    
                        TOLL.location = location;
                        console.log("\n trip id : "+PARENT_ACTIVITY_ID.tempTripActivityParentID);
                        TOLL.activityID = PARENT_ACTIVITY_ID.tempTripActivityParentID;
                        
                        addTollActivityData(TOLL);
                        
                        logAddToll();
                        
                        if(isShowToll==1){
                            backAddTollAction();
                        }
                        else{
                            getTotalTripCostForTripLog(PARENT_ACTIVITY_ID.tempTripActivityParentID);
                        }
                        
                    }
                }
            }
            
        }
    }
}

function updateTripTollDataCB(){
    backAddTollAction();
    
}

function showTolls(id){
    //Empty the list
    $('#tollsID ul').html("");
    getTollData(id);
    
    PARENT_ACTIVITY_ID.tempTripActivityParentID = id;
    
}

function showTollsCB(obj){
    
    //Add to list
    $('#tollsID ul').append("<li class=\"tollTableRow\"><div id=\"tollTableRowID\"><span id=\"tollNameTableRowID\" style=\"text-transform:capitalize;width:60px\">"+obj.name+"  :  </span><span id=\"tollCostTableRowID\" style=\"text-transform:capitalize;width:60px\"> $"+obj.cost+"</span><span id=\"tollLocationTableRowID\" style=\"text-transform:capitalize;width:60px;margin-left:120px\">"+obj.location+"</span><br/><span id=\"tollDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:10px\">"+obj.date+"</span><button onclick=\"JavaScript:deleteToll("+obj.pID+")\" style=\"margin-left:150px\">Delete</button></div></li>");
    
    refresh("#tollsID ul");
    
}

function deleteToll(id){
    navigator.notification.confirm("Confirm deletion", function confirmCB(button){
                                     if(button==1){
                                            deleteTollData(id);  
                                     
                                     }
                                 }, "MECARS", 'YES,NO');
    
}

function deleteTollCB(){
    var pID = PARENT_ACTIVITY_ID.tempTripActivityParentID;
    showTolls(pID);
    
}

/*****************************************************************************************************/

/**************************************** Add/Show Note **********************************************/

function saveNoteAction(name,subject,notes){
    if(name==""){
        alert("Please enter customer name");
    }
    else{
        if(subject==""){
            alert("Please enter subject");
        }
        else{
            if(notes==""){
                alert("Please enter custom notes");
            }
            else{
                //Save
                NOTE.name = name;
                NOTE.subject = subject;
                NOTE.notes = notes;
                NOTE.activityID = PARENT_ACTIVITY_ID.tempTripActivityParentID;
                addNoteActivityData(NOTE);
                logAddNotes();
                backAddNotesAction();
            }
        }
    }
    
}

function emptyAddNotesValues(){
    $('#noteCustomerNameID').val("");
    $('#noteSubjectID').val("");
    $('#noteCustomID').val("");
    
}


function showNotes(id){
    //Empty the list
    $('#notesID ul').html("");
    getNoteData(id);
    
    PARENT_ACTIVITY_ID.tempTripActivityParentID = id;
}

function showNotesCB(obj){
    //Add to list
    $('#notesID ul').append("<li style=\"height:40px\" class=\"noteTableRow\"><div id=\"noteTableRowID\" style=\"width:100px; float:left\"><span id=\"noteNameTableRowID\" style=\"text-transform:capitalize;width:60px\">"+obj.name+"</span><br/><span id=\"noteSubjectTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:10px\">"+obj.subject+"</span></div><div id=\"noteNotesTableRowID\" style=\"width:150px; float:left\"><span id=\"noteNotesTableRowID\" style=\"text-transform:capitalize;width:60px\">"+obj.notes+"</span><button onclick=\"JavaScript:deleteNote("+obj.pID+")\" style=\"margin-left:100px\">Delete</button></div></li>");
    
    refresh("#notesID ul");
    
}

function deleteNote(id){
    navigator.notification.confirm("Confirm deletion", function confirmCB(button){
                                     if(button==1){
                                            deleteNoteData(id);
                                     
                                     }
                                 }, "MECARS", 'YES,NO');
    
}

function deleteNoteCB(){
    var pID = PARENT_ACTIVITY_ID.tempTripActivityParentID;
    showNotes(pID);
    
}

/*****************************************************************************************************/

/****************************************** Show Trip Logs *******************************************/

function showTripLogs(){
    //Empty the list
    $('#myTripsID ul').html("");
    getTripDetails();
}

function showTripLogsCB(obj){
    
    console.log("Distance : "+obj.distance);
    if(!obj.distance)
        obj.distance = 0;
    
    if(obj.status=="Cancelled"){
        //Add to list
        $('#myTripsID ul').append("<li class=\"\"><div id=\"myTripTableRowID\"><span id=\"myTripNameTableRowID\" style=\"text-transform:capitalize;width:60px;font-size:12px\">"+obj.date+"    </span><span id=\"myTripCostTableRowID\" style=\"text-transform:capitalize;width:60px; font-size:11px\">  "+obj.status+"</span> <br/> <span id=\"myTripLocationTableRowID\" style=\"text-transform:capitalize;width:60px;font-size:11px; margin-left:0px\">From : "+obj.locationName+"</span>  <br/><span id=\"myTripDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:11px\">To : "+obj.destinationName+"</span><br/><span id=\"myTripDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:11px\">Mileage : "+obj.distance.toFixed(3)+"</span><br/><span id=\"myTripDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:11px\">Amount Requested : "+obj.cost+"</span></div></li>");
    }
    else{
        if(obj.status!="Unconfirmed"){
            $('#myTripsID ul').append("<li class=\"\"><div style=\"height:100px\"><div id=\"myTripTableRowID\" style=\"width:180px; float:left\"><span id=\"myTripNameTableRowID\" style=\"text-transform:capitalize;width:60px;font-size:12px\">"+obj.date+"    </span><span id=\"myTripCostTableRowID\" style=\"text-transform:capitalize;width:60px; font-size:11px\">  "+obj.status+"</span> <br/> <span id=\"myTripLocationTableRowID\" style=\"text-transform:capitalize;width:60px;font-size:11px; margin-left:0px\">From : "+obj.locationName+"</span> <br/><span id=\"myTripDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:11px\">To : "+obj.destinationName+"</span><br/><span id=\"myTripDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:11px\">Mileage : "+obj.distance.toFixed(3)+"</span><br/><span id=\"myTripDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:11px\">Amount Requested : "+obj.cost+"</span></div><div style=\"width:100px;float:left\"><div class=\"tripLogButton\"><button style=\"margin-top:3px\" onclick=\"JavaScript:addTollTripLog("+obj.activityID+")\" style=\"margin-left:5px\">Add Toll</button></div><div class=\"tripLogButton\"><button onclick=\"JavaScript:addNoteTripLog("+obj.activityID+")\" style=\"margin-left:5px\">Add Note</button></div><div class=\"tripLogButton\"><button onclick=\"JavaScript:editTripLogsLocName("+obj.pID+")\" style=\"margin-left:5px\">Edit</button></div><div class=\"tripLogButton\"><button onclick=\"JavaScript:cancelEditTripLog("+obj.pID+")\" style=\"margin-left:5px\">Cancel</button></div></div></div></li>");
        }
        else{
            $('#myTripsID ul').append("<li class=\"\"><div style=\"height:130px\"><div id=\"myTripTableRowID\" style=\"width:180px; float:left\"><span id=\"myTripNameTableRowID\" style=\"text-transform:capitalize;width:60px;font-size:12px\">"+obj.date+"    </span><span id=\"myTripCostTableRowID\" style=\"text-transform:capitalize;width:60px; font-size:11px\">  "+obj.status+"</span> <br/> <span id=\"myTripLocationTableRowID\" style=\"text-transform:capitalize;width:60px;font-size:11px; margin-left:0px\">From : "+obj.locationName+"</span> <br/><span id=\"myTripDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:11px\">To : "+obj.destinationName+"</span><br/><span id=\"myTripDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:11px\">Mileage : "+obj.distance.toFixed(3)+"</span><br/><span id=\"myTripDateTableRowID\" style=\"text-transform:capitalize;width:100px; font-size:11px\">Amount Requested : "+obj.cost+"</span></div><div style=\"width:100px;float:left\"><div class=\"tripLogButton\"><button onclick=\"JavaScript:addTollTripLog("+obj.activityID+")\" style=\"margin-left:5px\">Add Toll</button></div><div class=\"tripLogButton\"><button onclick=\"JavaScript:addNoteTripLog("+obj.activityID+")\" style=\"margin-left:5px\">Add Note</button></div><div class=\"tripLogButton\"><button onclick=\"JavaScript:editTripLogsLocName("+obj.pID+")\" style=\"margin-left:5px\">Edit</button></div><div class=\"tripLogButton\"><button onclick=\"JavaScript:cancelEditTripLog("+obj.pID+")\" style=\"margin-left:5px\">Cancel</button><button onclick=\"JavaScript:confirmEditTripLog("+obj.pID+")\" style=\"margin-left:5px\">Confirm</button></div></div></div></li>");
        }
        
    }
    refresh("#myTripsID ul");
    isShowToll = 0;
    isShowNote = 0;
    
    tempEditTripLogID = 0;
}

function confirmEditTripLog(id){
    navigator.notification.confirm("Confirm Trip", function confirmCB(button){
                                   if(button==1){
                                       cancelEditTripLogs("Pending",id); // cancel the trip
                                   }
                                }, "MECARS", 'YES,NO');
    
}

function addTollTripLog(id){
    PARENT_ACTIVITY_ID.tempTripActivityParentID = id;
    loadAddTolls();
    
}

function addNoteTripLog(id){
    PARENT_ACTIVITY_ID.tempTripActivityParentID = id;
    loadAddNotes();
    
}

function editTripLogsLocName(id){
    tempEditTripLogID   =   id;
    
    document.getElementById('editMyTripStartLocNameID').value = "";
    document.getElementById('editMyTripDestinationNameID').value = "";
    
    loadEditTripLogs();
}

function editMyTripSave(start,destination){
    if(start!=""&&destination!=""){
        updateEditTripLogDetails(start,destination,tempEditTripLogID);
    }
    else{
        alert("Please Enter all fields");
    }
}

function cancelEditTripLog(id){
    
    navigator.notification.confirm("Confirm cancel", function confirmCB(button){
                                 if(button==1){
                                     $('#startStopButtonID').buttonMarkup({theme: 'g'});
                                     //Change the state of the trip button
                                     document.getElementById('startStopId').innerHTML = "Start Trip";
                                     
                                     //Hide the Cancel button and other log labels
                                     document.getElementById('cancelTripButtonID').style.display = "none";
                                     document.getElementById('testLocactionID').style.display = "none";
                                     document.getElementById('distanceID').style.display = "none";
                                     ////////////////
                                     cancelEditTripLogs("Cancelled",id); // cancel the trip
                                 
                                 }
                                 }, "MECARS", 'YES,NO');
    
}

/*****************************************************************************************************/


/*************************************** Trip Storage Setting ****************************************/

var isCleanData = 0;

function setTripStorageDuration(duration){
    document.getElementById('tripStorageDurationID').innerHTML = duration+" days";
    
    var tDate = new Date();
    var diff = duration;
    removeDataAtDate = new Date(oldDateObj.getTime() + diff*24*60*60000);
    try{
        if(removeDataAtDate){
            if(window.localStorage.getItem("remove_data_on_date")){
                window.localStorage.removeItem("remove_data_on_date");
                console.log("Remove Date: "+sessionID);
            }
            window.localStorage.setItem("remove_data_on_date", removeDataAtDate);
        }
    }
    catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
        }
    }
}

function setTripStorageData(data){
    document.getElementById('tripStorageDataID').innerHTML = data;
    
}

function setDefaultRemoveDataDate(){
    if(!window.localStorage.getItem("remove_data_on_date")){
        var tDate = new Date();
        var str = document.getElementById('tripStorageDurationID').innerHTML;
        var duration = str.split(" ");
        var diff = duration[0];
        removeDataAtDate = new Date(tDate.getTime() + diff*24*60*60000);
        try{
            if(removeDataAtDate){
                if(window.localStorage.getItem("remove_data_on_date")){
                    window.localStorage.removeItem("remove_data_on_date");
                }
                window.localStorage.setItem("remove_data_on_date", removeDataAtDate);
                console.log("removed date : "+window.localStorage.getItem("remove_data_on_date"));
            }
        }
        catch (e) {
            if (e == QUOTA_EXCEEDED_ERR) {
                alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
            }
        }
    }
}

function checkDataCleanStatus(){
    if(!window.localStorage.getItem("remove_data_on_date")){
        setDefaultRemoveDataDate();
    }
    else{
        var deleteDate = new Date(window.localStorage.getItem("remove_data_on_date"));
        var today = new Date();
        if(today>deleteDate){
            //Sync and delete Data, Set delete data status as true in order to delete data at successfull completeion of syncing data
            isCleanData = 1;
            syncAllTripData();
        }
    }
}

function trashData(){
    //Trash data that has been synced here
    deleteTripData();
}

/*****************************************************************************************************/

/************************************ GET START TRIP LOCATION DATA ***********************************/

function getStartLocationDataReq(){
    //alert("in request");
    getStartLocationData(usernameDB);
}

function getStartLocationDataCB(){
    if(!m_StartLocDataError){
        var locName = m_StartLocData;
        if(!locName)
            var locName = "Start";
        addTripLogAtStart(locName);
    }
    else{
        var locName = "Start";
        addTripLogAtStart(locName);
        
        //alert(m_StartLocData);
    }
    
}


/*****************************************************************************************************/


/******************************************** SETTINGS ***********************************************/

function updateHomeAddress(address,city,zip,state){
    if(address){
        if(city){
            if(zip){
                if(state){
                    sendNewAddressRequest(usernameDB,address,city,zip,state,"home");
                }
                else
                    incompleteFields();
            }
            else
                incompleteFields();
        }
        else
            incompleteFields();
    }
    else
        incompleteFields();
    
}

function updateAddressCB(){
    if(m_AddNewAddressError){
        alert(m_AddNewAddressData);
    }
    else{
        alert("Request Sent");
    }
    
}

function incompleteFields(){
    alert("Enter All fields");
}

function updateWorkAddress(address,city,zip,state){
    if(address){
        if(city){
            if(zip){
                if(state){
                    sendNewAddressRequest(usernameDB,address,city,zip,state,"work");
                }
                else
                    incompleteFields();
            }
            else
                incompleteFields();
        }
        else
            incompleteFields();
    }
    else
        incompleteFields();
    
}

function saveDailyCommutes(distance){
    if(distance){
        updateDailyCommuteType(distance);
    }
    else{
        alert("Please enter distance");
    }
}

function saveDailyCommutesCB(){
    alert("Successfully saved");
    backChangePwdAction();
}


/*****************************************************************************************************/

/******************************* Remember Login credentials ******************************************/

function saveLoginCredentials(name, pwd){
    
    try {
        if(window.localStorage.getItem("username"))
            window.localStorage.removeItem("username"); 
        if(window.localStorage.getItem("password"))
            window.localStorage.removeItem("password");
        
		window.localStorage.setItem("username", name);
        window.localStorage.setItem("password", pwd);
	}
    catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Quota exceeded!'); //data wasn't successfully saved due to quota exceed so throw an error
		}
	}
}

function getLoginCredentialsAtStart(){
    console.log("Username : "+window.localStorage.getItem("username"));
    if(window.localStorage.getItem("username"))
        document.getElementById('usrID').value = window.localStorage.getItem("username");
    if(window.localStorage.getItem("password"))
        document.getElementById('pwdID').value = window.localStorage.getItem("password");
}

/*****************************************************************************************************/

/***************************************** Feedback **************************************************/

function setFeedbackFeature(title){
    document.getElementById('feedbackFeatureTitleID').innerHTML = title;
}

function setFeedbackType(title){
    document.getElementById('feedbackTypeTitleID').innerHTML = title;
}

function sendFeedbackToServer(desc,feature,type){
    //Call feedback API
    sendFeedback(usernameDB,desc,feature,type);
    
}

//feedback API callback
function sendFeedbackToServerCB(){
    if(!m_FeedbackError){
        alert("Feedback sent successfully");
    }
    
}

/*****************************************************************************************************/

/*************************************** Distance fields *********************************************/

function chkDistanceNumeric(){
    
    var reg = /^\d+$/;
    var distance = document.getElementById('dailyCommutesDistanceID').value;
    if (reg.test(distance)) {
        saveDailyCommutes(document.getElementById('dailyCommutesDistanceID').value);
    }
    else{
        alert("Please enter correct value");
    }
}

/*****************************************************************************************************/

/************************************** Local Notification *******************************************/

var localNotificationInterval;
var localNotificationIntervalTime = 30;

//function callLocalNotification(){
//		localNotificationInterval = setInterval(function getPositionAfterInterval(){
//				if(isStartTrip){
//                    if(distanceBWTrips){
//							var d = new Date();
//        					d = d.getTime() + 1 * 1000; //60 seconds from now
//        					d = new Date(d);
//
//        					if (typeof plugins !== "undefined") {
//        						console.log("local notification set");
//        						var distance = "Recording Trip \n" + distanceBWTrips +" mi travelled" +" , "+Math.floor(timeBWTrips/1000/60)+" min elapsed";
//        						console.log(distance);
//        						plugins.localNotification.add({
//        							date: d,
//        							message: distance,
//        							ticker : "Recording Trip",
//        							repeatDaily : false,
//        							id : 4
//        						});   
//        					}
//        					else{
//        						console.log("no plugin found");
//        					}
//                    }
//				}
//                      
//			},localNotificationIntervalTime);
//	 
//}
//
//function clearCallLocalNotification(){
//        clearInterval(localNotificationInterval);
//}

function callLocalNotification(){
	var d = new Date();
    d = d.getTime() + 1*1000; //1 seconds from now
    d = new Date(d);
    window.plugins.localNotification.cancelAll();
    var distance = "Recording Trip \n" + distanceBWTrips.toFixed(3) +" mi travelled" +" , "+Math.floor(timeBWTrips/1000/60)+" min elapsed";
    console.log(distance);
    plugins.localNotification.add({
    								date: d,
    								message: distance,
    								ticker : "Recording Trip",
    								repeatDaily : false,
    								id : 4
                            });
}

/*****************************************************************************************************/

//populate the location from local data base
var getLocationInterval;
$('#homePage').live('pageshow',function(){
	console.log("homepage showing");
	clearInterval(getLocationInterval);
	getLocationInterval = setInterval(function(){
							getLocationObject();
						  },2000);
	
}).load('homePage');

function getLocationObjectCB(loc){
	console.log("LOGGGG : current lat : " + loc.lat +" long :"+ loc.long);
	clearInterval(getLocationInterval);
	if(currentPageId == "#homePage")
		var name = ''+$('#addLocationID').val();
	else
		var name = ''+$('#addEndLocationID').val();
	getNearestLocations(loc,name);
}

function getNearestLocationsCB(nearestLocations){
	if(currentPageId == "#homePage")
		$('#startLocationList ul').html("");
	else
		$('#endLocationList ul').html("");
	for(var i=0;i<nearestLocations.length;i++){
	if(currentPageId == "#homePage")
		$('#startLocationList ul').append("<li><a href=\"javascript:setStartLocationData('"+nearestLocations[i].locationName+"','"+nearestLocations[i].locationId+"')\" style=\"font-size:12px\">"+nearestLocations[i].locationName+"</a></li>");
	else
		$('#endLocationList ul').append("<li><a href=\"javascript:setStartLocationData('"+nearestLocations[i].locationName+"','"+nearestLocations[i].locationId+"')\" style=\"font-size:12px\">"+nearestLocations[i].locationName+"</a></li>");
	}
	try{
	if(currentPageId == "#homePage")
		refresh('#startLocationList ul');
	else
		refresh('#endLocationList ul');
	}catch(err){
		console.log("ERRRRRRRRRRR"+err);
	}
}

function setStartLocationData(locationName,locationId){
	if(currentPageId == "#homePage"){
		$('#addLocationID').val(locationName);
		refresh('#addLocationID');
	}else{
		$('#addEndLocationID').val(locationName);
		refresh('#addEndLocationID');
	}
	
}

$('#addLocationID').live('input' , function () { 
	getLocationObject();
});

$('#addEndLocationID').live('input' , function () { 
	getLocationObject();
});

//populate the end location  list from location table
var getLocationInterval;
$('#endTripPage').live('pageshow',function(){
	console.log("end trip  showing");
	clearInterval(getLocationInterval);
	getLocationInterval = setInterval(function(){
							getLocationObject();
						  },2000);
	
}).load('endTripPage');