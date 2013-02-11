

/**** Location ****/
var startTripLat = 0;
var startTripLong = 0;

var startTripTime = 0;

var stopTripLat = 0;
var stopTripLong = 0;


var currentLat = 0;
var currentLong = 0;

var lastKnownLat = 0;
var lastKnownLong = 0;

var isStartTrip;

var distanceBWTrips = 0;
var timeBWTrips = 0;

var watchID = null;

var timeCalled = 0;

var distanceTime;

/******************************************* Watch Location *****************************************/

function watchLocation(interval){
    watch_id = navigator.geolocation.watchPosition(
                                   // Success
                        function(position){
                        	console.log("Log: In watch trip");
                                   currentLat = position.coords.latitude;
                                   currentLong = position.coords.longitude;
                                   if(isStartTrip==1){
                                	   
                                	   console.log("Log: In start trip");
                                       if(startTripTime==0){
                                            var startDate1 = new Date();
                                            startTripTime = startDate1;
                                       }
                                       else{
                                            var newDate = new Date();
                                            timeBWTrips = newDate - startTripTime;
                                       }
                                                   
                                                                                           
                                        if(startTripLat==0)
                                            startTripLat = currentLat;
                                        if(startTripLong==0){
                                            startTripLong = currentLong;
                                        }
                                        else{
                                            var p1 = new google.maps.LatLng(lastKnownLat, lastKnownLong);
                                            var p2 = new google.maps.LatLng(currentLat, currentLong);
                                                   
                                            distanceBWTrips = distanceBWTrips + calcDistance(p1, p2);
                                                   
                                        }
                                           
                                        lastKnownLat = currentLat;
                                        lastKnownLong = currentLong;
                                        //distanceBWTrips = calcDistance(p1, p2);
                                        //console.log("Distance between trips : "+distanceBWTrips);
                                   }
                                                   
                                   timeCalled = timeCalled + 1;
                                   //console.log("Lat : "+currentLat+ " ||| Long : "+currentLong +" ||| Time Called : "+timeCalled);
                                   document.getElementById('testLocID').innerHTML = "Lat : "+currentLat+ " ||| Long : "+currentLong +" ||| Time Called : "+timeCalled;
                                   document.getElementById('distanceTravelledID').innerHTML = distanceBWTrips + " mi";
                                   document.getElementById('timeTravelledID').innerHTML = Math.floor(timeBWTrips/1000/60) + " min";
                                   document.getElementById('reviewTripDistanceID').innerHTML = distanceBWTrips + " mi" +", "+Math.floor(timeBWTrips/1000/60) + " min";
                                   //Record to database
                                  // logOngoingTripLocation();
                        },
                       function geolocationError(err){
                                    console.log("Error :"+err.message);
                        },
                        // Settings
                        { maximumAge: interval, enableHighAccuracy: true }
    );
    
}

//calculates distance between two points in km's
function calcDistance(p1, p2){
	try{
		var  l_distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
	    return (l_distance*0.6);
	}catch(err){
		return 0.0;
	}
    
}

/****************************************************************************************************/

/***************************************** Get Location *********************************************/

function getLocationAndAddData(obj){
	navigator.geolocation.getCurrentPosition(function onSuccess(position){
                                             currentLat = position.coords.latitude;
                                             currentLong = position.coords.longitude;
                                             
                                             obj.lat = currentLat;
                                             obj.long = currentLong;
                                             obj.locationTypeId = 8000;
                                             if(!obj.locationName)
                                            	 obj.locationName = "Null";
                                             
                                             addLocationActivityData(obj);
                                             console.log("Location added");
                                             
                                    },
                                    function geolocationError(error){
                                             console.log("Error code : "+error.code+"\n Error msg : "+error.message +"\n Please try again later");
                                             
                                             obj.lat = 0.0;
                                             obj.long = 0.0;
                                             obj.locationTypeId = 8002;
                                             if(!obj.locationName)
                                            	 obj.locationName = "Null";
                                             
                                             addLocationActivityData(obj);
                                    },{enableHighAccuracy: true});
}

function getWatchLocation(){
	console.log("log: In watch location");
    navigator.geolocation.getCurrentPosition(function onSuccess(position){
                                                currentLat = position.coords.latitude;
                                                currentLong = position.coords.longitude;
                                                if(isStartTrip==1){
                                                	console.log("log: In watch location start trip");
                                                    if(startTripTime==0){
                                                        var startDate1 = new Date();
                                                        startTripTime = startDate1;
                                                    }
                                                    else{
                                                        var newDate = new Date();
                                                        timeBWTrips = newDate - startTripTime;
                                                    }
                                             
                                             
                                                    if(startTripLat==0)
                                                        startTripLat = currentLat;
                                                    if(startTripLong==0){
                                                        startTripLong = currentLong;
                                                    }
                                                    else{
                                                        var p1 = new google.maps.LatLng(lastKnownLat, lastKnownLong);
                                                        var p2 = new google.maps.LatLng(currentLat, currentLong);
                                             
                                                        distanceBWTrips = distanceBWTrips + calcDistance(p1, p2);
                                             
                                                    }
                                             
                                                    lastKnownLat = currentLat;
                                                    lastKnownLong = currentLong;
                                                    //distanceBWTrips = calcDistance(p1, p2);
                                                    //console.log("Distance between trips : "+distanceBWTrips);
                                                }
                                             
                                                timeCalled = timeCalled + 1;
                                                //console.log("Lat : "+currentLat+ " ||| Long : "+currentLong +" ||| Time Called : "+timeCalled);
                                                document.getElementById('testLocID').innerHTML = "Lat : "+currentLat+ " ||| Long : "+currentLong +" ||| Time Called : "+timeCalled;
                                                document.getElementById('distanceTravelledID').innerHTML = distanceBWTrips.toFixed(3) + " mi";
                                                document.getElementById('timeTravelledID').innerHTML = Math.floor(timeBWTrips/1000/60) + " min";
                                                document.getElementById('reviewTripDistanceID').innerHTML = distanceBWTrips.toFixed(3) + " mi" +", "+Math.floor(timeBWTrips/1000/60) + " min";
                                                //Record to database
                                                logOngoingTripLocation();
                                                
                                                callLocalNotification();
                                                
                                      		},
                                             function geolocationError(error){
                                                console.log("Error :"+err.message);
                                                logOngoingTripLocation();
                                                
                                             },{enableHighAccuracy: true});
}

	
/***************************Get the current location object**************************************/
function getLocationObject(){
		var obj= new Object();
		
		navigator.geolocation.getCurrentPosition(function onSuccess(position){
			obj.lat = position.coords.latitude;
	        obj.long = position.coords.longitude;
	        getLocationObjectCB(obj);
	        },
	     function geolocationError(error){
	        console.log("Error :"+err.message);
	     },{enableHighAccuracy: true});
}

/***************************************************************************************************/




//function geolocationPositionSuccess(position){
//    if(isStartTrip){
//        startTripLat = position.coords.latitude;
//        startTripLong = position.coords.longitude;
//        
//        document.getElementById('startStopId').innerHTML = "Complete Trip";
//    }
//    else{
//        stopTripLat = position.coords.latitude;
//        stopTripLong = position.coords.longitude;
//        
//        document.getElementById('startStopId').innerHTML = "Start Trip";
//        
//        var p1 = new google.maps.LatLng(startTripLat, startTripLong);
//        var p2 = new google.maps.LatLng(stopTripLat, stopTripLong);
//        
//        distanceBWTrips = calcDistance(p1, p2);
//        
//        //Navigate to END_TRIP screen when successfull login
//        $.mobile.changePage("#endTripPage", {
//                            transition: "slide",
//                            reverse: false
//                            });
//    }
//}


/*** Watch Geolocation ***/

//Clear watch on end trip
//function clearWatch() {
//    if (watchID != null) {
//        
//        document.getElementById('startStopId').innerHTML = "Start Trip";
//        
//        navigator.geolocation.clearWatch(watchID);
//        watchID = null;
//        
//        //Navigate to END_TRIP screen when successfull login
//        $.mobile.changePage("#endTripPage", {
//                            transition: "slide",
//                            reverse: false
//                            });
//        
//    }
//}

/*************************/