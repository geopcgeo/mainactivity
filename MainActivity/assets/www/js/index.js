var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        
        document.addEventListener("pause", devicePause, false);
        document.addEventListener("resume", deviceResume, false);
        document.addEventListener("offline", deviceOffline, false);
        document.addEventListener("online", deviceOnline, false);
        
        window.addEventListener("batterystatus", checkBattery, false);
        
     // Handling the device back Button 
   		document.addEventListener("backbutton", function(e){
   			    if($.mobile.activePage.is('#loginPage')){
   			       navigator.app.exitApp();
   			    }
   			}, false);
        
       app.report('deviceready');

    },
    report: function(id) {
        
        //Initialize DB
        
        var l_deviceData = {
            deviceName : device.name,
            devicePhonegap : device.phonegap,
            deviceUDID : device.uuid,
            devicePlatform : device.platform,
            deviceVersion : device.version
        };
        
        initializeDB(l_deviceData);

        console.log("report:" + id);
        
        console.log('Device Name: '     + device.name     + '<br />' +
                    'Device PhoneGap: ' + device.phonegap + '<br />' +
                    'Device Platform: ' + device.platform + '<br />' +
                    'Device UUID: '     + device.uuid     + '<br />' +
                    'Device Version: '  + device.version  + '<br />');
        
        checkSessionValidity();
        
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
           
    }
};

function devicePause() {
    
    console.log("Device pause called");
    //Log Pause event
    logDeviceTelemetryPause();
    if(isStartTrip==1){
    	console.log("trip is in process");

        var d = new Date();
        d = d.getTime() + 5 * 1000; //60 seconds from now
        d = new Date(d);

        if (typeof plugins !== "undefined") {
            console.log("local notification set");
            var distance = "Recording Trip \n" + distanceBWTrips +" mi travelled" +" , "+Math.floor(timeBWTrips/1000/60)+" min elapsed";
            console.log(distance);
        	plugins.localNotification.add({
        		date: d,
        		message: distance,
        		ticker : "Recording Trip",
                repeatDaily : false,
                id : 4
        	});   
        }
        else{
        	console.log("no plugin found");
        }
    }
}

function deviceResume() {
	
	logDeviceTelemetryResume();
    console.log("Device resume called");
    
}

function deviceOnline() {
    
	logDeviceTelemetryOnline();
    console.log("Device came online");
    
}
function deviceOffline() {
    
    logDeviceTelemetryOffline();
    console.log("Device become offline");
    
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for( i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if(x == c_name) {
               return unescape(y);
            }
        }
}

function checkSessionValidity(){
    console.log("check session expire validity");
    if(window.localStorage.getItem("session_expire")){
        
        var sessionExpire = window.localStorage.getItem("session_expire");
        console.log("check session expire: "+sessionExpire);
        
        var expireDate = new Date(sessionExpire);
        
        var cDate = new Date();
        
        console.log("current date : "+cDate+"  expire date : "+expireDate);
        
        if(cDate<expireDate){
            logAutoLogin();
            console.log("Navigate..");
            //Navigate to home page
            loadHome();
        }
    }
}

var batteryPlugged = 0;

function checkBattery(info){
    
    if(isStartTrip){
        // Handle the online event
        console.log("Level: " + info.level + " isPlugged: " + info.isPlugged);
        if(!info.isPlugged){
            if(!batteryPlugged){
                alert("Please plug in your device, in order to save battery");
                batteryPlugged = 1;
            }
        }
    }
}

function onUnload(){
    
}
