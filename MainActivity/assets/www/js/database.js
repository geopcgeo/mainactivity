
/************************************* Initialize Database ***************************************/

var l_uuid="";
var myDB="";
var deviceData = {};

function initializeDB(deviceDta){
    deviceData = deviceDta;
    l_uuid = deviceData.deviceUDID;
    myDB = window.openDatabase("dbMECARS", "1.0", "MECARS", 5*1024*1024);
    myDB.transaction(populateDB, errorCB, successCB);   //create table needed when initialising
    
    //Set login credentials at start
    getLoginCredentialsAtStart();

}

/*************************************************************************************************/
/**
activity_type
  activity_type_id
  parent_id
  level
  activity_type_name
  activity_type_qname <-- "q" means qualified -- so parent_type_name "." activity_type_name "Login::Failed Login"

insert into activity_type (activity_type_id)   // Login


activity
  activity_ID
  activity_type_id
  PARENT_id
  level 

 Gender_TYPE
 MAIL
 FEMAIL
 
User
  gender: int
 
 
 
100 0     Login -> Log in
101 100     Present login
102 100     Authentication request
110 100     Authentication response
 
 500 0    Shahid new feature
 50` 500  NEW FEATURE SUBTYPE
 
 // activity_id, parent_id, activity_type_id, activity_descr, started_on, completed_on, remarks, started_at_lat, started_at_long, completed_at_lat, completed_at_long}
 
 // activity_type(s): trip, toll
 // "Login" -> "Present login"
 // "Login" -> "Fail Login" or "Successful Login"
 // "Enterprise Command" -> "Set location update time"
 // "Start Trip": id (parent_id is null)
 // "Continue Trip": parent_id is the starting trip ID
 // "End Trip": id -> autogen, parent_id is the starting trip ID
 // "Settings", "Updated setting value X to Y"
 
 
**/
/************************************* Create table here *****************************************/
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS user (uid INTEGER PRIMARY KEY AUTOINCREMENT, username varchar(255), device_id varchar(255))');
    
    // add a party table -- use "Party Model" to store clients/organizations
    tx.executeSql('CREATE TABLE IF NOT EXISTS party (party_id INTEGER PRIMARY KEY AUTOINCREMENT,clientname_id REFERENCES client (clientname_id))');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS client (clientname_id INTEGER PRIMARY KEY, clientname varchar(255))');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS activity_type (activity_type_id INTEGER PRIMARY KEY, parent_id INTEGER,level INTEGER NOT NULL DEFAULT 0, name varchar(255) NOT NULL, qname varchar(255) NOT NULL, description varchar(255))');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS location_type (location_type_id INTEGER PRIMARY KEY, name varchar(255) NOT NULL)');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS location (location_id INTEGER PRIMARY KEY AUTOINCREMENT, latitude DECIMAL NOT NULL, latitude_text varchar(255) NOT NULL, longitude DECIMAL NOT NULL, longitude_text varchar(255) NOT NULL,location_name varchar(255), location_type_id REFERENCES location_type (location_type_id))');
    
    //tx.executeSql('CREATE TABLE IF NOT EXISTS activity (activity_id INTEGER PRIMARY KEY AUTOINCREMENT, parent_id INTEGER, level INTEGER NOT NULL DEFAULT 0, activity varchar(255) NOT NULL, activity_type_id REFERENCES activity_type (activity_type_id), remarks varchar(800), started_on datetime NOT NULL, ended_on datetime NOT NULL, started_location_id REFERENCES location (location_id), completed_location_id REFERENCES location (location_id), sync_bit INTEGER NOT NULL DEFAULT 0)');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS config_setting_type (config_setting_type_id INTEGER PRIMARY KEY, name varchar(255) NOT NULL, is_runtime_const integer NOT NULL, remarks varchar(255))');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS config_setting (config_setting_id INTEGER PRIMARY KEY AUTOINCREMENT, config_setting_type_id REFERENCES config_setting_type (config_setting_type_id), name varchar(255) NOT NULL, value varchar(255))');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS toll_activity (toll_id INTEGER PRIMARY KEY AUTOINCREMENT, activity_id REFERENCES activity (activity_id), name varchar(255) NOT NULL, cost INTEGER NOT NULL, date datetime, location varchar(255))');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS note_activity (note_id INTEGER PRIMARY KEY AUTOINCREMENT, activity_id REFERENCES activity (activity_id), customer_name varchar(255) NOT NULL, subject varchar(255) NOT NULL, custom_notes varchar(255))');
    
    tx.executeSql('CREATE TABLE IF NOT EXISTS trip_activity (trip_id INTEGER PRIMARY KEY AUTOINCREMENT, activity_id REFERENCES activity (activity_id), start_location_name varchar(255), destination_name varchar(255), distance DECIMAL, cost DECIMAL , type varchar NOT NULL, status varchar(255) NOT NULL, party_id REFERENCES party (party_id))');
    
    //newSyncActivityId = insert into activity ... sync activity type
    tx.executeSql('CREATE TABLE IF NOT EXISTS activity (activity_id INTEGER PRIMARY KEY AUTOINCREMENT, parent_id INTEGER, level INTEGER NOT NULL DEFAULT 0, activity varchar(255) NOT NULL, activity_type_id REFERENCES activity_type (activity_type_id), remarks varchar(800), started_on datetime NOT NULL, ended_on datetime NOT NULL, started_location_id REFERENCES location (location_id),selected_start_location_id REFERENCES location (location_id), completed_location_id REFERENCES location (location_id), selected_completed_location_id REFERENCES location (location_id), synced_immediate integer NOT NULL, synced_immediate_status varchar(255), sync_activity_id integer REFERENCES activity(activity_id))');
    
    //update resync count to 1 at every resync data (like updating row in database and syncing it again with server) 
    //tx.executeSql('CREATE TABLE IF NOT EXISTS activity (activity_id INTEGER PRIMARY KEY AUTOINCREMENT, parent_id INTEGER, level INTEGER NOT NULL DEFAULT 0, activity varchar(255) NOT NULL, activity_type_id REFERENCES activity_type (activity_type_id), remarks varchar(800), started_on datetime NOT NULL, ended_on datetime NOT NULL, started_location_id REFERENCES location (location_id), completed_location_id REFERENCES location (location_id), synced_immediate integer NOT NULL, synced_immediate_status varchar(255), sync_activity_id integer REFERENCES activity(activity_id),resync_count INTEGER)');
    
    insertActivityTypes();
    insertConfigSettingsTypes();
    insertLocationTypes();
}

function successCB() {
    //Set the default date to convey message to user to trash data
    checkDataCleanStatus();
    //Log Activities
    logLogin();
    
//    getConfigSettingBaseURL();
    
}
/****************************************************************************************************/

/**************************************** Error Callback ********************************************/

function errorCB(err) {
    alert("Error processing SQL: \n Code : "+err.code+" \n Message : "+err.message);
}
                  
/****************************************************************************************************/

/*************************************** Insert User data *******************************************/

var usernameDB;
var deviceIDDB;

function addUserData(uname, device){
    usernameDB = uname;
    deviceIDDB = device;
    
    //Check for the device id if don't exists then save
    getDeviceID(device);
    
}

function queryAddUserDB(tx) {
    tx.executeSql('Insert into user (username,device_id) values (?,?)',[usernameDB,deviceIDDB]);
}

/****************************************************************************************************/

/************************************* Get deviceId from db *****************************************/

var l_deviceID;
function getDeviceID(device){
    l_deviceID = device;
    myDB.transaction(queryGetDeviceID, errorCB);
}

function queryGetDeviceID(tx){
    tx.executeSql('select * from user where device_id=?',[l_deviceID],deviceSuccessCB,errorCB);
}

function deviceSuccessCB(tx, results) {
    //alert("Rows : "+results.rows.length);
    if (!results.rows.length) {  //Add user into db if there is a new device
        myDB.transaction(queryAddUserDB, errorCB);
        
    }
    else{
       // alert("user not added");
        
    }
}

/******************************************************************************************************/

/************************************* Insert Activity Types ****************************************/

var insertedActivityTypeId;

var currentParentID = 0;
var loginActivityTypeParentID = 1;
var tripActivityTypeParentID = 6;
var tollActivityTypeParentID = 11;
var noteActivityTypeParentID = 13;
var logoutActivityTypeParentID = 13;

function insertActivityTypes(){
    for(var i=0; i<activityTypes.length ; i++){
        checkActivityType(activityTypes[i].id, activityTypes[i].parent_id, activityTypes[i].level, activityTypes[i].name, activityTypes[i].qname,activityTypes[i].remarks);
    }
}

function checkActivityType(id, parent, level, name, qname, description){
    //Is activity type present, if not then add it
    myDB.transaction(function getAct1(tx){
                     tx.executeSql('select * from activity_type where activity_type_id = ?',[id] , function getActCB(tx, results) {
                                   if(results.rows.length==0){
                                        addActivityType(id, parent, level, name, qname, description);
                                   }
                        });
                     }, errorCB);
    
}
function addActivityType(id, parent, level, name, qname, description){
    
    myDB.transaction(function activityTypeTX(tx){
                     tx.executeSql('insert into activity_type (activity_type_id, parent_id, level, name,qname,description) values (?,?,?,?,?,?)',[id, parent,level, name, qname, description],function activityTypeCB(tx,results){
                                   insertedActivityTypeId =  results.insertId;
                                   
                        });
                     
                     }, function errorCB(err) {
                            alert("Error processing (addActivityType) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}
/******************************************************************************************************/

/********************************** Insert Location Types ***************************************/

function insertLocationTypes(){
	for(var i=0; i<locationTypes.length ; i++){
		checkLocationType(locationTypes[i].id,locationTypes[i].name);
	}
}

function checkLocationType(id,name){
	 myDB.transaction(function getAct1(tx){
         tx.executeSql('select * from location_type where location_type_id = ?',[id] , function getActCB(tx, results) {
                       if(results.rows.length==0){
                            addLocationType(id, name);
                       }
            });
         }, errorCB);
}

function addLocationType(id, name){
	myDB.transaction(function activityTypeTX(tx){
        tx.executeSql('insert into location_type (location_type_id,name) values (?,?)',[id, name],function activityTypeCB(tx,results){
                      insertedActivityTypeId =  results.insertId;
                      
           });
        
        }, function errorCB(err) {
               console.log("Error processing (locationActivityType) SQL: \n Code : "+err.code+" \n Message : "+err.message);
        });
}

/******************************************************************************************************/

/********************************** Insert Config Settings Type ***************************************/

function insertConfigSettingsTypes(){
    for(var i=0; i<configSettingsTypes.length ; i++){
        var pos = i+1;
        checkConfigSettingType(configSettingsTypes[i].id, configSettingsTypes[i].name, configSettingsTypes[i].remarks, configSettingsTypes[i].value, configSettingsTypes[i].is_runtime_const,pos);
    }
}

function checkConfigSettingType(id, name, remarks, value1, isRuntimeConst, pos){
    //Is setting type present, if not then add it
    myDB.transaction(function getConfigSettingTX(tx){
                     tx.executeSql('select * from config_setting_type where config_setting_type_id = ?',[id] , function getConfigSettingCB(tx, results) {
                                   if(results.rows.length==0){
                                        addConfigSettingType(id, name, remarks, value1, isRuntimeConst);
                                   }
                                   else{
                                        getConfigSetting(pos);
                                   }
                        });
                     }, errorCB);
}

function addConfigSettingType(id, name, remarks, value2, isRuntimeConst){
    myDB.transaction(function configSettingTypeTX(tx){
                     tx.executeSql('insert into config_setting_type (config_setting_type_id, name, remarks,is_runtime_const) values (?,?,?,?)',[id, name, remarks, isRuntimeConst], function configSettingTypeCB(tx,results){
                                   addConfigSetting(id, name,remarks, value2);
                        });
                     
                     }, function errorCB(err) {
                            alert("Error processing (addConfigSettingType) config type SQL: \n Code : "+err.code+" \n Message : "+err.message);
                });
    
}

function addConfigSetting(id, name, remarks, value3){
    myDB.transaction(function configSettingTX(tx){
                     tx.executeSql('insert into config_setting (config_setting_type_id, name, value) values (?,?,?)',[id, name, value3],function configSettingTypeCB(tx,results){
                                        getConfigSetting(results.insertId);
                                   });
                     
                     }, function errorCB(err) {
                            alert("Error processing (addConfigSetting) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}

function updateDailyCommuteType(distance){
    //console.log("Daily commute distance : "+distance);
    myDB.transaction(function updateDailyCommuteTypeTX(tx){
                     tx.executeSql('update config_setting set value = ?  where config_setting_type_id = 201',[distance],function updateDailyCommuteTypeCB(e){
                                       //console.log("Daily commute saved to db");
                                       saveDailyCommutesCB();
                                   });
                     
                     }, errorCB);
}

/******************************************************************************************************/

/*************************************** Get Config Setting ****************************************/

function getConfigSetting(id){
    myDB.transaction(function getConfigSettingTX1(tx){
                     tx.executeSql('select * from config_setting where config_setting_id = ?',[id] , function getConfigSettingCB(tx, results) {
                                   if(results.rows.length){
                                       for(var i=0; i<results.rows.length ;i++){
                                            checkRuntimeConst(results.rows.item(i).config_setting_type_id, results.rows.item(i).value);
                                       }
                                   }
                                   });
                     }, errorCB);
}

function checkRuntimeConst(id, value){
    myDB.transaction(function checkRuntimeConstTX1(tx){
                     tx.executeSql('select * from config_setting_type where config_setting_type_id = ?',[id] , function checkRuntimeConstCB(tx, results) {
                                   if(results.rows.length){
                                        if(results.rows.item(0).is_runtime_const){
                                               //console.log("SETTINGS["+results.rows.item(0).name+"] : "+value);
                                               SETTINGS[results.rows.item(0).name] = value;
                                               //set the base url  
                                               if(results.rows.item(0).name=="ENTERPRISE_APP_BASE_URL"){
                                                    url = SETTINGS.ENTERPRISE_APP_BASE_URL;
                                               }
                                        }
                                   }
                        });
                }, errorCB);
}


function getAllSettingsToSync(){
    
    
}

/******************************************************************************************************/

/****************************************** Activities ************************************************/

var currentActivityParentID = 0;

/***************************************** Login Activity *********************************************/

var insertedActivityID = 0;
var tollActivityParentID;
var noteActivityParentID;

function addParentLoginActivity(parent, level, activity, activityTypeID, remarks, startDate, endDate, startLocationID, selectedStartLocationID, completedLocationID, selectedcompletedLocationID, parentName){
    //console.log("end date: "+endDate+" ");
    myDB.transaction(function loginActivityTX(tx){
                     tx.executeSql('insert into activity (parent_id, level, activity, activity_type_id, remarks, started_on, ended_on, started_location_id,selected_start_location_id, completed_location_id,selected_completed_location_id,synced_immediate,synced_immediate_status,sync_activity_id) values (?,?,?,?,?,?,?,?,?,?,?,0,?,0)',[0, level, activity, activityTypeID, remarks, startDate, endDate, startLocationID,selectedStartLocationID,completedLocationID,selectedcompletedLocationID,""],function loginActivityCB(tx,results){
                                   //console.log("Inserted Activity with Id : "+results.insertId);     //Set the inserted id as the current parent activity id
                                   insertedActivityID = results.insertId;
                                   currentActivityParentID = insertedActivityID;
                                   //console.log("Crnt ID :"+currentActivityParentID);
                                   
                                   //console.log("Parent name :"+parentName);
                                   
                                   isActivityCompleted = 1;
                                   
                                   switch(parentName){
                                        case "Login":
                                            PARENT_ACTIVITY_ID.loginActivityParentID = currentActivityParentID;
                                        break;
                                   
                                        case "Trip":
                                            PARENT_ACTIVITY_ID.tripActivityParentID = currentActivityParentID;
                                   
                                            MY_TRIP.activityID = PARENT_ACTIVITY_ID.tripActivityParentID;
                                            MY_TRIP.distance = "";
                                            MY_TRIP.status = "In Process";
                                            MY_TRIP.cost = "";
                                            MY_TRIP.destinationName = "";
                                            MY_TRIP.locationName = startLocationName;
                                            MY_TRIP.type = "default";
                                            addTripDetails(MY_TRIP);
                                        break;
                                   
                                        case "Enterprise Synchronization":
                                           PARENT_ACTIVITY_ID.syncActivityParentID = currentActivityParentID;
                                           //After inserting sync_activity_id update all of the synced rows with the sync activity id
                                           updActivityDataWithSyncActivityId(currentActivityParentID);
                                        break;
                                   
                                        default:
                                        break;
                                   
                                   }
                                   
                                   //console.log("trip ID :"+PARENT_ACTIVITY_ID.tripActivityParentID);
                                   
                                   //Show Activities
                                   //getActivity();
                                   
                                   //Try to immediate sync data
                                   syncImmediateTripData(insertedActivityID);
                                   
                      });
                     
                     }, errorCB);
    
}

function addLoginActivity(parent, level, activity, activityTypeID, remarks, startDate, endDate, startLocationID,selectedStartLocationID, completedLocationID,selectedCompletedLocationID){
    
    myDB.transaction(function loginActivityTX(tx){
                     tx.executeSql('insert into activity (parent_id, level, activity, activity_type_id, remarks, started_on, ended_on, started_location_id,selected_start_location_id,completed_location_id,selected_completed_location_id, synced_immediate,synced_immediate_status,sync_activity_id) values (?,?,?,?,?,?,?,?,?,?,?,0,?,0)',[parent, level, activity, activityTypeID, remarks, startDate, endDate, startLocationID,selectedStartLocationID, completedLocationID,selectedCompletedLocationID,""],function loginActivityCB(tx,results){
                                            //console.log("Inserted Activity with Id : "+results.insertId);     //Set the inserted id as the current parent activity id
                                   insertedActivityID = results.insertId;
                                   
                                   isActivityCompleted = 1;
                                   
                                   //console.log("LocID B4 : "+insertedLocationID+ " Act ID : "+activityTypeID);
                                   //At Complete Trip update the completed location id
                                   if(insertedLocationID!=0){
                                       if(activityTypeID==504){
                                            //console.log("In 504");
                                            updCompleteLocTripActivity(selectedCompletedLocationID);
                                       }
                                       else if(activityTypeID==2500){
                                            //console.log("In 2500");
                                            updCompleteLoginActivity();
                                       }
                                   }
                                   
                                   //Show Activities
                                   //getActivity();
                                   
                                   //Try to immediate sync data
                                   syncImmediateTripData(insertedActivityID);
                                   
                            });
                     //if server available then sync it with server, 
                     }, errorCB);
    
}

function getQnameFirst(obj){
    //Before adding activity get the qname of the current activity type and afterwards add the activity
    getActivityTypeQname(obj);
    
}

function getActivityTypeQname(obj){
    //console.log("Type id : "+obj.activityTypeID);
    myDB.transaction(function getAct1(tx){
                     tx.executeSql('select qname from activity_type where activity_type_id = ?',[obj.activityTypeID] , function getActCB(tx, results) {
                                   if(results.rows.length){
                                        obj.activity = results.rows.item(0).qname;
                                        //console.log("qname : "+ obj.activity);
                                   
                                        addActivityData(obj);
                                   }
                                   });
                     }, errorCB);
}

function addActivityData(obj){
    //console.log("Is Parent : "+obj.isParent);
	if(obj.selectedLocationId){
		if(obj.selectedLocationId == -1){
			obj.selectedLocationId = insertedLocationID;
		}
	}else{
		obj.selectedLocationId = insertedLocationID;
	}
    if(obj.isParent==1){
        //console.log("In Parent and enddate :"+obj.endDate);
        addParentLoginActivity(obj.parent, obj.level, obj.activity, obj.activityTypeID, obj.remarks, obj.startDate, obj.endDate,insertedLocationID,obj.selectedLocationId, insertedLocationID,obj.selectedLocationId, obj.parentName);
    }
    else{
        //console.log("In Child");
        //console.log("Current ParentId : "+currentActivityParentID);
        addLoginActivity(currentActivityParentID, obj.level, obj.activity, obj.activityTypeID, obj.remarks, obj.startDate, obj.endDate,insertedLocationID,obj.selectedLocationId, insertedLocationID,obj.selectedLocationId);
    }
    
}

/******************************************************************************************************/

/************************************** Update Login Activity *****************************************/

//After logout in successfully, update the completed on state
function updCompleteLoginActivity(){
    var date = new Date();
    //console.log("Locid: "+insertedLocationID+"\n End Date : "+date+"\n Activity ID : "+PARENT_ACTIVITY_ID.loginActivityParentID);
    myDB.transaction(function completeLoginActivityTX(tx){
                     tx.executeSql('update activity set ended_on = ?,completed_location_id = ?  where activity_id = ?',[date,insertedLocationID, PARENT_ACTIVITY_ID.loginActivityParentID],function completeLoginActivityCB(e){
                                   
                                   });
                     
                     }, errorCB);
}

/******************************************************************************************************/

/************************************** Update Trip Activity *****************************************/

//After Confirm Trip , update the completed_location_id on state
function updCompleteLocTripActivity(selctedCompletedLocationID){
    var date = new Date();
    //console.log("Locid: "+insertedLocationID+"\n End Date : "+date+"\n Activity ID : "+PARENT_ACTIVITY_ID.tripActivityParentID);
    myDB.transaction(function completeLoginActivityTX(tx){
                     tx.executeSql('update activity set completed_location_id = ?,selected_completed_location_id = ?, ended_on = ?,sync_activity_id = ?,synced_immediate = ? where activity_id = ?',[insertedLocationID, selctedCompletedLocationID, date,0,0,PARENT_ACTIVITY_ID.tripActivityParentID],function completeTripActivityCB(e){
                                           console.log("Log : Loc updated");
                                           syncAllTripData();
                                   });
                     
                     }, function errorCB(err) {
                            alert("Error processing (updCompleteLocTripActivity) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}

/******************************************************************************************************/

/************************************ Insert Location Data ********************************************/

var insertedLocationID;

function addLocationActivityData(obj){
    addLocationData(obj);
    
}

function addLocationData(obj){
	myDB.transaction(function activityTypeTX(tx){
                     tx.executeSql('insert into location (latitude, latitude_text, longitude,longitude_text,location_name,location_type_id) values (?,?,?,?,?,?)',[obj.lat,""+obj.lat+"", obj.long, ""+obj.long+"",obj.locationName,obj.locationTypeId],function addLocationDataCB(tx,results){
                                   //console.log("Inserted Location Id : "+results.insertId);     //Set the inserted id as the current parent activity id
                                   insertedLocationID = results.insertId;
                                   getQnameFirst(obj);
                        });
                     
                     }, function errorCB(err) {
                            alert("Error processing (addLocationData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}


/******************************************************************************************************/

/************************************ Insert Toll Data ********************************************/

var insertedTollID;

function addTollActivityData(obj){
    addTollData(obj);
    
}

function addTollData(obj){
    //console.log("Toll activity id : "+obj.activityID);
    myDB.transaction(function tollTX(tx){
                     tx.executeSql('insert into toll_activity (activity_id, name, cost, date, location) values (?,?,?,?,?)',[obj.activityID, obj.name, obj.cost, obj.date, obj.location],function tollCB(tx,results){
                                        //console.log("Inserted Toll Id : "+results.insertId);
                                        insertedTollID = results.insertId;
                                   
                                   });
                     
                     }, function errorCB(err) {
                            alert("Error processing (addTollData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}

/**************************************** Get Toll Data ***********************************************/

function getTollData(id){
    myDB.transaction(function getTollDataTX1(tx){
                     tx.executeSql('select * from toll_activity where activity_id = ?',[id] , function getTollDataCB(tx, results) {
                                   //console.log("Show Tolls.. "+ results.rows.length);
                                   if(results.rows.length){
                                   for(var i=0; i<results.rows.length ;i++){
                                           //console.log("\n Name : "+ results.rows.item(i).name +"\n Activity Id : "+ results.rows.item(i).activity_id +"\n Cost : "+ results.rows.item(i).cost + "\n date : "+ results.rows.item(i).date+ "\n location : "+ results.rows.item(i).location);
                                           TOLL.pID = results.rows.item(i).toll_id;
                                           TOLL.name = results.rows.item(i).name;
                                           TOLL.cost = results.rows.item(i).cost;
                                           TOLL.date = results.rows.item(i).date;
                                           TOLL.location = results.rows.item(i).location;
                                           TOLL.activityID = id;
                                           showTollsCB(TOLL);
                                   }
                                }
                        });
                     },
                     function errorCB(err) {
                        alert("Error processing (getTollData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getAllTollData(){
    myDB.transaction(function getAllTollDataTX1(tx){
                     tx.executeSql('select * from toll_activity',[] , function getAllTollDataCB(tx, results) {
                                   //console.log("Show All Tolls.. "+ results.rows.length);
                                   
                                   TOLLS = [];
                                   
                                   if(results.rows.length){
                                       for(var i=0; i<results.rows.length ;i++){
                                   
                                            tempToll = {};
                                   
                                           //console.log("\n Name : "+ results.rows.item(i).name +"\n Activity Id : "+ results.rows.item(i).activity_id +"\n Cost : "+ results.rows.item(i).cost + "\n date : "+ results.rows.item(i).date+ "\n location : "+ results.rows.item(i).location);
                                           tempToll.pID = results.rows.item(i).toll_id;
                                           tempToll.name = results.rows.item(i).name;
                                           tempToll.cost = results.rows.item(i).cost;
                                           tempToll.date = results.rows.item(i).date;
                                           tempToll.location = results.rows.item(i).location;
                                   
                                            TOLLS.push(tempToll);
                                   
                                       }
                                   
                                        frequentToll2();
                                   }
                                });
                     },
                     function errorCB(err) {
                        alert("Error processing (getAllTollData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}


function deleteTollData(id){
    myDB.transaction(function getTollDataTX1(tx){
                     tx.executeSql('delete from toll_activity where toll_id = ?',[id] , function getTollDataCB(tx, results) {
                                       //console.log("Delete Toll.. "+ results.rows.length);
                                       deleteTollCB();
                                   
                                   });
                     },
                     function errorCB(err) {
                        alert("Error processing (deleteTollData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

/******************************************************************************************************/

/************************************ Insert Note Data ********************************************/

var insertedNoteID;

function addNoteActivityData(obj){
    addNoteData(obj);
    
}

function addNoteData(obj){
    //console.log("Note activity id : "+obj.activityID);
    myDB.transaction(function tollTX(tx){
                     tx.executeSql('insert into note_activity (activity_id, customer_name, subject, custom_notes) values (?,?,?,?)',[obj.activityID, obj.name, obj.subject, obj.notes],function tollCB(tx,results){
                                   //console.log("Inserted Note Id : "+results.insertId);
                                   insertedNoteID = results.insertId;
                                   
                                   //Show Notes
                                   //getNoteData();
                            });
                     
                     },
                     function errorCB(err) {
                            alert("Error processing (addNoteData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}

function deleteNoteData(id){
    myDB.transaction(function getTollDataTX1(tx){
                     tx.executeSql('delete from note_activity where note_id = ?',[id] , function getTollDataCB(tx, results) {
                                   //console.log("Delete Note.. "+ results.rows.length);
                                   deleteNoteCB();
                                   
                            });
                     },
                     function errorCB(err) {
                            alert("Error processing (deleteNoteData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

/**************************************** Get Note Data ***********************************************/

function getNoteData(id){
    myDB.transaction(function getNoteDataTX1(tx){
                     tx.executeSql('select * from note_activity where activity_id = ?',[id] , function getNoteDataCB(tx, results) {
                                   //console.log("Show Notes.. "+ results.rows.length)
                                   if(results.rows.length){
                                   for(var i=0; i<results.rows.length ;i++){
                                       NOTE.pID = results.rows.item(i).note_id;
                                       NOTE.name = results.rows.item(i).customer_name;
                                       NOTE.subject = results.rows.item(i).subject;
                                       NOTE.notes = results.rows.item(i).custom_notes;
                                       NOTE.activityID = results.rows.item(i).activity_id;
                                   
                                       //console.log("Customer : "+NOTE.name+ " \n Subject : "+NOTE.subject + " \n Notes : "+NOTE.notes + "\n Activity : "+NOTE.activityID);
                                   
                                       showNotesCB(NOTE);
                                   }
                    }
                });
            },
                     function errorCB(err) {
                            alert("Error processing (getNoteData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

/******************************************************************************************************/

/******************************************* My Trips *************************************************/

var instertedTripID = 0 ;

function addTripDetails(obj){
    console.log("Trip activity id : "+obj.activityID);
    myDB.transaction(function tollTX(tx){
                     tx.executeSql('insert into trip_activity (activity_id, start_location_name, destination_name, distance, cost, status, type) values (?,?,?,?,?,?,?)',[obj.activityID, obj.locationName, obj.destinationName, obj.distance, obj.cost, obj.status,obj.type],function tollCB(tx,results){
                                   console.log("locN : "+obj.locationName+"\n destN : "+obj.destinationName+"\n distance : "+obj.distance + "\n cost : "+ obj.cost + "\n status : "+ obj.status + "\n type : "+obj.type);
                                   //console.log("Inserted Trip Id : "+results.insertId);
                                   instertedTripID = results.insertId;
                                   //Show Trip
                                   //getTripDetails();
                });
            },
            function errorCB(err) {
                     alert("Error processing (addTripDetails) SQL: \n Code : "+err.code+" \n Message : "+err.message);
        });
    
}

function updateTripType(type, id){
    //console.log("Update Triptype with trip id : "+id);
    myDB.transaction(function updateTripTypeTX(tx){
                     tx.executeSql('update trip_activity set type = ? where trip_id = ?',[type, id],function updateTripTypeCBB(tx,results){
                                       //console.log("Type Updated");
                                        updateTripTypeCB();
                                   });
                     
                     },
                     function errorCB(err) {
                        alert("Error processing (updateTripType) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function cancelTripDetails(obj){
    console.log("Cancel Trip activity id : "+obj.activityID +"TripID status:"+instertedTripID+"||"+obj.status);
    myDB.transaction(function tollTX(tx){
                     tx.executeSql('update trip_activity set start_location_name = ?, destination_name = ?, distance = ?, cost = ?, status = ? where trip_id = ?',[obj.locationName, obj.destinationName, obj.distance, obj.cost, obj.status, instertedTripID],function tollCB(tx,results){
                                   //Show Trip
                                   //getTripDetails();
                                   });
                     
                     },
                     function errorCB(err) {
                            alert("Error processing (cancelTripDetails) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
    
}

function cancelEditTripLogs(status, id){
    console.log("Cancel Trip log  id : "+id);
    myDB.transaction(function tollTX(tx){
                     tx.executeSql('update trip_activity set status = ? where trip_id = ?',[status, id],function tollCB(tx,results){
                                        //Refresh trip logs
                                        showTripLogs();
                                   });
                     
                     },
                     function errorCB(err) {
                        alert("Error processing (cancelEditTripLogs) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function updateTripDetails(obj){
    console.log("Upd Trip activity id : "+obj.activityID + "|| Destination : "+obj.destinationName);
    myDB.transaction(function tollTX(tx){
                     tx.executeSql('update trip_activity set start_location_name = ?, destination_name = ?, distance = ?, cost = ?, status = ?, party_id = ? where trip_id = ?',[obj.locationName, obj.destinationName, obj.distance, obj.cost, obj.status,insertedPartyID, instertedTripID],function tollCB(tx,results){
                                        insertedPartyID = 0; //Again, initialise to 0, after insertion
                                        //Show Trip
                                        getTripDetails();
                                   });
                     
                     },
                     function errorCB(err) {
                            alert("Error processing (updateTripDetails) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}


function updateEditTripLogDetails(start,destination,id){
    console.log("Upd Edit Trip activity id : "+id);
    myDB.transaction(function updateEditTripLogDetailsTX(tx){
                     tx.executeSql('update trip_activity set start_location_name = ?, destination_name = ? where trip_id = ?',[start, destination, id],function updateEditTripLogDetailsCB(tx,results){
                                   //console.log("Updated");
                                   backEditMyTripAction();
                                   //Show Trip
                                   //getTripDetails();
                                });
                     
                     },
                     function errorCB(err) {
                            alert("Error processing (updateEditTripLogDetails) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}

function getTripDetails(){
    myDB.transaction(function getAct1(tx){
                     tx.executeSql('select * from trip_activity order by trip_id desc',[] , function getActCB(tx, results) {
                                   if(results.rows.length){
                                   console.log("Show Trip details : "+results.rows.length);
                                   for(var i=0; i<results.rows.length ;i++){
                                            l_MY_TRIP = {};
                                   
                                            console.log("\n ActivityId : "+ results.rows.item(i).activity_id+ " \n Loc Name : "+ results.rows.item(i).start_location_name +"\n Destination Name : "+results.rows.item(i).destination_name+"\n Distance : "+results.rows.item(i).distance+"\n Cost : "+results.rows.item(i).cost+"\n Status : "+results.rows.item(i).status);
                                   
                                           l_MY_TRIP.pID = results.rows.item(i).trip_id;
                                           l_MY_TRIP.activityID = results.rows.item(i).activity_id;
                                           l_MY_TRIP.distance = results.rows.item(i).distance;
                                           l_MY_TRIP.status = results.rows.item(i).status;
                                           l_MY_TRIP.destinationName = results.rows.item(i).destination_name;
                                           l_MY_TRIP.locationName = results.rows.item(i).start_location_name;
                                           l_MY_TRIP.cost = results.rows.item(i).cost;
                                   
                                            getTripDate(l_MY_TRIP);
                                   
                                   }
                            }
                    });
                },
                     function errorCB(err) {
                            alert("Error processing (getTripDetails) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
    
}

function getTripDate(obj){
    myDB.transaction(function getTripDateTX1(tx){
                     tx.executeSql('select started_on from activity where activity_id = ?',[obj.activityID] , function getTripDateCB(tx, results) {
                                   var date = new Date(results.rows.item(0).started_on);
                                   //console.log("getTripDate : "+results.rows.item(0).started_on);
                                   obj.date = "";
                                   
                                   if(results.rows.length){
                                        //console.log(date.getDate() + "/"+(date.getMonth()+1)+"/"+date.getFullYear());
                                        obj.date = (date.getMonth()+1) + "/"+date.getDate()+"/"+date.getFullYear();
                                   
                                        showTripLogsCB(obj);
                                   
                                   }
                                });
                     },
                     function errorCB(err) {
                        alert("Error processing (getTripDate) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getTotalTripCost(id){
    myDB.transaction(function getTripCostDataTX1(tx){
                     tx.executeSql('select * from toll_activity where activity_id = ?',[id] , function getTripCostCB(tx, results) {
                                   //console.log("Show Trips cost "+ results.rows.length);
                                   MY_TRIP.cost = 0;
                                   if(results.rows.length){
                                       
                                       for(var i=0; i<results.rows.length ;i++){
                                           
                                           MY_TRIP.cost = MY_TRIP.cost + results.rows.item(i).cost;
                                           
                                       }
                                   }
                                   getTotalTripCostCB();
                        });
                     },
                     function errorCB(err) {
                        alert("Error processing (getTotalTripCost) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });

    
    
}

function getTotalTripCostForTripLog(id){
    myDB.transaction(function getTotalTripCostForTripLogTX1(tx){
                     tx.executeSql('select * from toll_activity where activity_id = ?',[id] , function getTotalTripCostForTripLogCB(tx, results) {
                                       var cost = 0;
                                       if(results.rows.length){
                                            for(var i=0; i<results.rows.length ;i++){
                                                cost = cost + results.rows.item(i).cost;
                                             }
                                       }
                                        //console.log("Show Tolls cost with id.. "+ id +"\n Cost is : "+cost);
                                       updateTripTollData(cost,id);
                                });
                     },
                     function errorCB(err) {
                        alert("Error processing (getTotalTripCostForTripLog) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function updateTripTollData(cost,id){
    // tx.executeSql('update trip_activity set cost = ? where activity_id = ?',[cost,id],
    //console.log("upd Tolls cost..with id  "+ id);
    myDB.transaction(function updateTripTollDataTX(tx){
                    tx.executeSql('update trip_activity set cost = ? where activity_id = ?',[cost,id],
                                function updateTripTollDataL_CB(tx,results){
                                    //console.log("Length : " + results.rows.length);
                                    updateTripTollDataCB();
                                });
                     
                     },
                     function errorCB(err) {
                            alert("Error processing (updateTripTollData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}

/******************************************************************************************************/

/******************************************************************************************************/

/**************************************** Sync Trip Data **********************************************/

var currentActivityRecord = 0;
var isImmediate = 0;
var SYNC_TRIP_DATA = [];

//Update sync details
function updSyncDetailsInActivityWithActivityId(activityId, syncImmediate, syncImmediateStatus, syncActivityId){
    //console.log("Sync Activity Id : "+activityId);
    myDB.transaction(function completeLoginActivityTX(tx){
                     tx.executeSql('update activity set synced_immediate = ?, synced_immediate_status = ? , sync_activity_id = ? where activity_id = ?',[syncImmediate,syncImmediateStatus ,syncActivityId, activityId],function completeTripActivityCB(e){
                                        //console.log("Sync successfully updated");
                                   });
                     },
                     function errorCB(err) {
                        alert("Error processing (updSyncDetailsInActivityWithActivityId) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}

//Update sync details
function updSyncAllDetailsInActivityWithActivityId(activityId, syncImmediate, syncImmediateStatus, syncActivityId){
    //console.log("Sync Activity Id : "+activityId);
    myDB.transaction(function completeLoginActivityTX(tx){
                     tx.executeSql('update activity set synced_immediate = ?, synced_immediate_status = ? , sync_activity_id = ? where activity_id = ?',[syncImmediate,syncImmediateStatus ,syncActivityId, activityId],function completeTripActivityCB(e){
                                   //console.log("Sync successfully updated");
                                   
                                   currentStncAllDataUploadId++;
                                   if(currentStncAllDataUploadId<l_synAllData.length){
                                       if(l_synAllData[currentStncAllDataUploadId].syncStatus=="OK"){
                                            updSyncAllDetailsInActivityWithActivityId(l_synAllData[currentStncAllDataUploadId].activityId, l_synAllData[currentStncAllDataUploadId].syncImmediate, l_synAllData[currentStncAllDataUploadId].syncImmediateStatus, syncId);
                                       }
                                       else
                                            updSyncAllDetailsInActivityWithActivityId(l_synAllData[currentStncAllDataUploadId].activityId, l_synAllData[currentStncAllDataUploadId].syncImmediate, l_synAllData[currentStncAllDataUploadId].syncImmediateStatus, 0);
                                   }
                                   else{
                                       isSyncComplete = 1;
                                       if(isCleanData){
                                            //delete data, if isCleanData was set(data clean up is to be done). Also, remove saved date object
                                            window.localStorage.removeItem("remove_data_on_date");
                                            //console.log("Trashing Data..");
                                            trashData();
                                       }
                                   }
                    });
                     
                     },
                     function errorCB(err) {
                        alert("Error processing (updSyncDetailsInActivityWithActivityId) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}

function getAllActivityDataToSync(){
    currentActivityRecord = 0;
    myDB.transaction(function getAct1(tx){
                     tx.executeSql('select activity_id from activity where sync_activity_id = 0 AND synced_immediate = 0',[] , function getActCB(tx, results) {
                           console.log("Show (getAllActivityDataToSync) Activities........ "+ results.rows.length);
                           if(results.rows.length){
                               isImmediate = 0;
                               activityRecords = [];
                               SYNC_TRIP_DATA = [];
                               for(var i=0; i<results.rows.length ;i++){
                                      activityRecords.push(results.rows.item(i).activity_id);
                               }
                               //console.log("Records : "+JSON.stringify(activityRecords));
                               getActivityDataToSyncWithActivityId(activityRecords[currentActivityRecord]);
                           }
                        });
                     },
                     function errorCB(err) {
                        alert("Error processing (getAllActivityDataToSync) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getActivityDataToSyncWithActivityId(id){
    myDB.transaction(function getAct1(tx){
        tx.executeSql('select * from activity where activity_id = ? AND sync_activity_id = 0 AND synced_immediate = 0',[id] , function getActCB(tx, results) {
               console.log("Show (getActivityDataToSyncWithActivityId) Activities.. "+ results.rows.length);
               if(results.rows.length){
                      for(var i=0; i<results.rows.length ;i++){
                           console.log(" \n Id : "+ results.rows.item(i).activity_id +"\n ParentId : "+ results.rows.item(i).parent_id +"\n Level : "+results.rows.item(i).level+"\n Activity : "+results.rows.item(i).activity+"\n Type Id : "+ results.rows.item(i).activity_type_id +"\n Remarks : "+results.rows.item(i).remarks+"\n Started on : "+results.rows.item(i).started_on+"\n Ended on : "+results.rows.item(i).ended_on+"\n Start Loc Id : "+results.rows.item(i).started_location_id+"\n End Loc Id : "+results.rows.item(i).completed_location_id+"\n Sync immediate Id : "+results.rows.item(i).synced_immediate+"\n Sync immediate status Id : "+results.rows.item(i).synced_immediate_status+"\n Sync Id : "+results.rows.item(i).sync_activity_id);
                           
                           SYNC_ACTIVITY = {};
                           
                           SYNC_ACTIVITY.activityId = results.rows.item(i).activity_id;
                           SYNC_ACTIVITY.parentId = results.rows.item(i).parent_id;
                           SYNC_ACTIVITY.level = results.rows.item(i).level;
                           SYNC_ACTIVITY.activity = results.rows.item(i).activity;
                           SYNC_ACTIVITY.remarks = results.rows.item(i).remarks;
                           SYNC_ACTIVITY.startedOn = results.rows.item(i).started_on;
                           SYNC_ACTIVITY.endedOn = results.rows.item(i).ended_on;
                           SYNC_ACTIVITY.startedLocationId = results.rows.item(i).started_location_id;
                           SYNC_ACTIVITY.selectedStartedLocationId = results.rows.item(i).selected_start_location_id;
                           SYNC_ACTIVITY.completedLocationId = results.rows.item(i).completed_location_id;
                           SYNC_ACTIVITY.selectedCompletedLocationId = results.rows.item(i).selected_completed_location_id;
                           SYNC_ACTIVITY.syncedImmediate = results.rows.item(i).synced_immediate;
                           SYNC_ACTIVITY.syncedImmediateStatus = results.rows.item(i).synced_immediate_status;
                           SYNC_ACTIVITY.synedActivityId = results.rows.item(i).sync_activity_id;
                           
                           SYNC_TOLL = [];
                           SYNC_TRIP = {};
                           SYNC_NOTE = [];
                           SYNC_LOCATION = [];
                           
                           SYNC_ACTIVITY.tripData = SYNC_TRIP;
                           SYNC_ACTIVITY.tollData = SYNC_TOLL;
                           SYNC_ACTIVITY.locationData = SYNC_LOCATION;
                           SYNC_ACTIVITY.noteData = SYNC_NOTE;
                           
                           //SYNC_TRIP_DATA[currentActivityRecord] = SYNC_ACTIVITY;
                           
                           getLocationWithLocId(SYNC_ACTIVITY);
                           
                        }
                    }
                });
            },
             function errorCB(err) {
                alert("Error processing (getActivityDataToSyncWithActivityId) SQL: \n Code : "+err.code+" \n Message : "+err.message);
             });
}

function getLocationWithLocId(obj){
    
    var id = obj.startedLocationId;
    var endId = obj.completedLocationId;
    var selectedStartLocationId = obj.selectedStartedLocationId;
    var selectedEndLocationId = obj.selectedCompletedLocationId;
    //console.log("Start Loc id : "+id+" ||| Complete loc id : "+endId);
    
    myDB.transaction(function getLocationWithLocId1(tx){
                     tx.executeSql('select * from location where location_id = ?',[id] , function getLocationWithLocIdCB(tx, results) {
                                   //console.log("Show Location.. "+ results.rows.length)
                                   if(results.rows.length){
                                        var tempLoc = {};
                                   
                                        //console.log("\n Start Id : "+ results.rows.item(0).location_id +"\n Latitude : "+ results.rows.item(0).latitude +"\n latitude text : "+results.rows.item(0).latitude_text+"\n Longitude : "+results.rows.item(0).longitude+"\n longitude text : "+ results.rows.item(0).longitude_text);
                                   
                                           tempLoc.locationId = results.rows.item(0).location_id;
                                           tempLoc.latitude = results.rows.item(0).latitude;
                                           tempLoc.latitudeText = results.rows.item(0).latitude_text;
                                           tempLoc.longitude = results.rows.item(0).longitude;
                                           tempLoc.longitudeText = results.rows.item(0).longitude_text;
                                           tempLoc.locationName = results.rows.item(0).location_name;
                                           tempLoc.locationType = results.rows.item(0).location_type_id;
                                   
                                           SYNC_LOCATION.push(tempLoc);
                                           
                                   }
                                   if(id==endId){
                                	   if(id == selectedStartLocationId){
                                		   if(id== selectedEndLocationId){
                                			   obj.locationData = SYNC_LOCATION;
                                               getNoteDataWithActivityId(obj);  
                                		   }else{
                                			   // get selected end location then notedata
                                			   getSelectedEndLocation(obj,selectedEndLocationId);
                                		   }
                                		   
                                	   }else{
                                		   //get selected start location & end location then notedata 
                                		   getSelectedStartLocation(obj,selectedStartLocationId,selectedEndLocationId);
                                	   }
                                       
                                   }
                                   else{
                                        getCompleteLocationWithLocId(obj,endId,selectedStartLocationId,selectedEndLocationId);
                                   }
                                   
                                   
                                });
                     },
                     function errorCB(err) {
                        alert("Error processing (getLocationWithLocId) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getCompleteLocationWithLocId(obj,endId,selectedStartLocationId,selectedEndLocationId){
    
    
    //console.log("Complete Loc id : "+endId);
    
    myDB.transaction(function getLocationWithLocId1(tx){
                     tx.executeSql('select * from location where location_id = ?',[endId] , function getLocationWithLocIdCB(tx, results) {
                                   //console.log("Show Location.. "+ results.rows.length)
                                   if(results.rows.length){
                                        var tempLoc = {};
                                       //console.log("\n Complete Id : "+ results.rows.item(0).location_id +"\n Latitude : "+ results.rows.item(0).latitude +"\n latitude text : "+results.rows.item(0).latitude_text+"\n Longitude : "+results.rows.item(0).longitude+"\n longitude text : "+ results.rows.item(0).longitude_text);
                                       
                                       tempLoc.locationId = results.rows.item(0).location_id;
                                       tempLoc.latitude = results.rows.item(0).latitude;
                                       tempLoc.latitudeText = results.rows.item(0).latitude_text;
                                       tempLoc.longitude = results.rows.item(0).longitude;
                                       tempLoc.longitudeText = results.rows.item(0).longitude_text;
                                       tempLoc.locationName = results.rows.item(0).location_name;
                                       tempLoc.locationType = results.rows.item(0).location_type_id;
                                       
                                       SYNC_LOCATION.push(tempLoc);
                                   
                                   }
                                   if(endId == selectedStartLocationId){
                                	   if(endId == selectedEndLocationId){
                                		   obj.locationData = SYNC_LOCATION;
                                           getNoteDataWithActivityId(obj);  
                                	   }else{
                                		   getSelectedEndLocation(obj,selectedEndLocationId);
                                	   }
                                	     
                                   }else{
                                	   getSelectedStartLocation(obj,selectedStartLocationId,selectedEndLocationId);
                                   }
                                   
                              });
                     },
                     function errorCB(err) {
                     alert("Error processing (getLocationWithLocId) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}



function getSelectedStartLocation(obj,selectedStartLocationId,selectedEndLocationId){
    
    
    //console.log("Complete Loc id : "+endId);
    
    myDB.transaction(function getLocationWithLocId1(tx){
                     tx.executeSql('select * from location where location_id = ?',[selectedStartLocationId] , function getLocationWithLocIdCB(tx, results) {
                                   //console.log("Show Location.. "+ results.rows.length)
                                   if(results.rows.length){
                                        var tempLoc = {};
                                       //console.log("\n Complete Id : "+ results.rows.item(0).location_id +"\n Latitude : "+ results.rows.item(0).latitude +"\n latitude text : "+results.rows.item(0).latitude_text+"\n Longitude : "+results.rows.item(0).longitude+"\n longitude text : "+ results.rows.item(0).longitude_text);
                                       
                                       tempLoc.locationId = results.rows.item(0).location_id;
                                       tempLoc.latitude = results.rows.item(0).latitude;
                                       tempLoc.latitudeText = results.rows.item(0).latitude_text;
                                       tempLoc.longitude = results.rows.item(0).longitude;
                                       tempLoc.longitudeText = results.rows.item(0).longitude_text;
                                       tempLoc.locationName = results.rows.item(0).location_name;
                                       tempLoc.locationType = results.rows.item(0).location_type_id;
                                       
                                       SYNC_LOCATION.push(tempLoc);
                                   
                                   }
                                   if(selectedStartLocationId== selectedEndLocationId){
                                	   	   obj.locationData = SYNC_LOCATION;
                                           getNoteDataWithActivityId(obj);  
                                	}else{
                                	   getSelectedEndLocation(obj,selectedEndLocationId);
                                   }
                                   
                              });
                     },
                     function errorCB(err) {
                     alert("Error processing (getLocationWithLocId) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}


function getSelectedEndLocation(obj,selectedEndLocationId){
    
    
    //console.log("Complete Loc id : "+endId);
    
    myDB.transaction(function getLocationWithLocId1(tx){
                     tx.executeSql('select * from location where location_id = ?',[selectedEndLocationId] , function getLocationWithLocIdCB(tx, results) {
                                   //console.log("Show Location.. "+ results.rows.length)
                                   if(results.rows.length){
                                        var tempLoc = {};
                                       //console.log("\n Complete Id : "+ results.rows.item(0).location_id +"\n Latitude : "+ results.rows.item(0).latitude +"\n latitude text : "+results.rows.item(0).latitude_text+"\n Longitude : "+results.rows.item(0).longitude+"\n longitude text : "+ results.rows.item(0).longitude_text);
                                       
                                       tempLoc.locationId = results.rows.item(0).location_id;
                                       tempLoc.latitude = results.rows.item(0).latitude;
                                       tempLoc.latitudeText = results.rows.item(0).latitude_text;
                                       tempLoc.longitude = results.rows.item(0).longitude;
                                       tempLoc.longitudeText = results.rows.item(0).longitude_text;
                                       tempLoc.locationName = results.rows.item(0).location_name;
                                       tempLoc.locationType = results.rows.item(0).location_type_id;
                                       
                                       SYNC_LOCATION.push(tempLoc);
                                   
                                   }
                                   obj.locationData = SYNC_LOCATION;
                                   getNoteDataWithActivityId(obj);  
                              });
                     },
                     function errorCB(err) {
                     alert("Error processing (getLocationWithLocId) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}
function getNoteDataWithActivityId(obj){
    
    var id = obj.activityId;
    //console.log("Note Activity id : "+id);
    
    myDB.transaction(function getNoteDataWithActivityIdTX(tx){
                     tx.executeSql('select * from note_activity where activity_id = ?',[id] , function getNoteDataWithActivityIdCB(tx, results) {
                                   //console.log("Show Notes.. "+ results.rows.length)
                                   if(results.rows.length){
                                       var NOTES = [];
                                       for(var i=0; i<results.rows.length ;i++){
                                           var tempNote = {};
                                           tempNote.pID = results.rows.item(i).note_id;
                                           tempNote.name = results.rows.item(i).customer_name;
                                           tempNote.subject = results.rows.item(i).subject;
                                           tempNote.notes = results.rows.item(i).custom_notes;
                                           tempNote.activityID = results.rows.item(i).activity_id;
                                           NOTES.push(tempNote);
                                   
                                           //console.log("Customer : "+tempNote.name+ " \n Subject : "+tempNote.subject + " \n Notes : "+tempNote.notes + "\n Activity : "+tempNote.activityID);
                                       }
                                       obj.noteData = NOTES;
                                   }
                                   getAllTollDataWithActivityID(obj);
                                });
                     },
                     function errorCB(err) {
                        alert("Error processing (getNoteDataWithActivityId) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getAllTollDataWithActivityID(obj){
    
    var id = obj.activityId;
    //console.log("TOLL Activity id : "+id);
    
    myDB.transaction(function getAllTollDataWithActivityIDTX1(tx){
                     tx.executeSql('select * from toll_activity where activity_id = ?',[id] , function getAllTollDataWithActivityIDCB(tx, results) {
                                   //console.log("Show All Tolls.. "+ results.rows.length);
                                   TOLLS = [];
                                   if(results.rows.length){
                                       for(var i=0; i<results.rows.length ;i++){
                                           tempToll = {};
                                           //console.log("\n Name : "+ results.rows.item(i).name +"\n Activity Id : "+ results.rows.item(i).activity_id +"\n Cost : "+ results.rows.item(i).cost + "\n date : "+ results.rows.item(i).date+ "\n location : "+ results.rows.item(i).location);
                                           tempToll.pID = results.rows.item(i).toll_id;
                                           tempToll.name = results.rows.item(i).name;
                                           tempToll.cost = results.rows.item(i).cost;
                                           tempToll.date = results.rows.item(i).date;
                                           tempToll.location = results.rows.item(i).location;
                                           TOLLS.push(tempToll);
                                       }
                                       obj.tollData = TOLLS;
                                   }
                                   getTripDetailsWithActivityID(obj);
                                });
                     },
                     function errorCB(err) {
                        alert("Error processing (getAllTollDataWithActivityID) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getTripDetailsWithActivityID(obj){
    var id = obj.activityId;
    //console.log("Trip Activity id : "+id);
    
    myDB.transaction(function getTripDetailsWithActivityIDTX(tx){
        
        tx.executeSql('select * from trip_activity where activity_id = ?',[id] , function getTripDetailsWithActivityIDCB(tx, results){
                if(results.rows.length){
                       //console.log("Show Trips with activity id");
                       l_MY_TRIP = {};
                       var i=0;
                       console.log("\n TripDetailsWithActivityID : "+ results.rows.item(i).activity_id+ " \n Loc Name : "+ results.rows.item(i).start_location_name +"\n Destination Name : "+results.rows.item(i).destination_name+"\n Distance : "+results.rows.item(i).distance+"\n Cost : "+results.rows.item(i).cost+"\n Status : "+results.rows.item(i).status+"\n Type : "+results.rows.item(i).type);
                       l_MY_TRIP.pID = results.rows.item(i).trip_id;
                       l_MY_TRIP.activityID = results.rows.item(i).activity_id;
                       l_MY_TRIP.distance = results.rows.item(i).distance;
                       l_MY_TRIP.status = results.rows.item(i).status;
                       l_MY_TRIP.destinationName = results.rows.item(i).destination_name;
                       l_MY_TRIP.locationName = results.rows.item(i).start_location_name;
                       l_MY_TRIP.cost = results.rows.item(i).cost;
                       l_MY_TRIP.type = results.rows.item(i).type;
                       l_MY_TRIP.partyId = results.rows.item(i).party_id;
                      
                       l_MY_TRIP.clientData = {};
                      
                       obj.tripData = l_MY_TRIP;
                }
                getClientDetails(obj);
                //syncCB(obj);
            });
        },
         function errorCB(err) {
            alert("Error processing (getTripDetailsWithActivityID) SQL: \n Code : "+err.code+" \n Message : "+err.message);
         });
}


function getClientDetails(obj){
    if(!jQuery.isEmptyObject(obj.tripData)){
        if(obj.tripData.partyId!=0&&obj.tripData.partyId!=null){
                var partyId = obj.tripData.partyId;
                //console.log("Party id : "+partyId);
                if(partyId){
                    myDB.transaction(function getPartyDataTX(tx){
                         tx.executeSql('select clientname_id from party where party_id = ?',[partyId],function getPartyDataCB(tx,results){
                                       //if(results.rows.item(0).clientname_id){
                                           //console.log(" Party Id : "+results.rows.item(0).clientname_id);
                                           getClientData(results.rows.item(0).clientname_id,obj);
                                       //}
                                       
                                    });
                         },
                         function errorCB(err) {
                            alert("Error processing (getClientDetails) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                         });
                }
                else{
                    syncCB(obj);
                }
        }
        else{
            syncCB(obj);
        }
    }
    else{
        syncCB(obj);
    }
}

function getClientData(id,obj){
    myDB.transaction(function getClientDataTX(tx){
                     tx.executeSql('select clientname from client where clientname_id = ?',[id],function getClientDataCB(tx,results){
                                   
                                            //console.log("Client name : "+results.rows.item(0).clientname);
                                            obj.tripData.clientData.clientId = id;
                                            obj.tripData.clientData.clientName = results.rows.item(0).clientname;
                                   
                                            syncCB(obj);
                                   
                                   });
                     
                     }, function errorCB(err) {
                     alert("Error processing (getClientData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
}

function syncCB(obj){
    SYNC_TRIP_DATA.push(obj);
    //If not immediate sync call, then loop through the next value to sync to server
    if(isImmediate==0){
        currentActivityRecord++;
        if(currentActivityRecord<activityRecords.length){
            //console.log("current record : "+currentActivityRecord);
            getActivityDataToSyncWithActivityId(activityRecords[currentActivityRecord]);
            
        }
        else{
            //console.log("Data : "+SYNC_TRIP_DATA.length);
            //console.log("Trip status : "+SYNC_TRIP_DATA[2].locationData.latitude);
            //console.log("Trip status 2 : "+SYNC_TRIP_DATA[2].activityId);
            
            //Call web service to sync activity data
            syncActivityData(SYNC_TRIP_DATA);
        }
    }
    else{
        //Call web service to sync activity data
        syncActivityData(SYNC_TRIP_DATA);
    }
    
}



/******************************************************************************************************/

/************************************** Sync Settings Data ********************************************/

var currentSettingRecord = 0;

function getConfigSettingsDataToSync(){
    currentSettingRecord = 0;
    myDB.transaction(function getConfigSettingsDataToSyncTX1(tx){
                     tx.executeSql('select * from config_setting',[] , function getConfigSettingsDataToSyncCB(tx, results) {
                                   SYNC_SETTINGS_DATA = [];
                                   settingRecords = [];
                                   if(results.rows.length){
                                       for(var i=0; i<results.rows.length ;i++){
                                           Settings_data = {};
                                           Settings_data.config_setting_id = results.rows.item(i).config_setting_id;
                                           Settings_data.config_setting_type_id = results.rows.item(i).config_setting_type_id;
                                            //console.log("Config setting type id --: "+Settings_data.config_setting_type_id);
                                           Settings_data.name = results.rows.item(i).name;
                                           Settings_data.value = results.rows.item(i).value;
                                   
                                           settingRecords.push(Settings_data);
                                       }
                                       //console.log("Config setting type id -: "+settingRecords[currentSettingRecord].config_setting_type_id);
                                       getConfigSettingTypesToSync(settingRecords[currentSettingRecord]);
                                }
                            });
                     },
                     function errorCB(err) {
                        alert("Error processing (getConfigSettingsDataToSync) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getConfigSettingTypesToSync(obj){
    var id = obj.config_setting_type_id;
    myDB.transaction(function getConfigSettingTypesToSyncTX1(tx){
                     tx.executeSql('select * from config_setting_type where config_setting_type_id = ?',[id] , function getConfigSettingTypesToSyncCB(tx, results) {
                                   //console.log(" Show (getConfigSettingTypesToSync) .. currentSettingRecord : "+currentSettingRecord);
                                   if(results.rows.length){
                                           Settings_type = {};
                                           Settings_type.name = results.rows.item(0).name;
                                           Settings_type.is_runtime_const = results.rows.item(0).is_runtime_const;
                                           Settings_type.remarks = results.rows.item(0).remarks;
                                           obj.type = Settings_type;
                                   
                                           SYNC_SETTINGS_DATA.push(obj);
                                   }
                                   currentSettingRecord++;
                                   if(currentSettingRecord<settingRecords.length){
                                        //console.log("2 Show (getConfigSettingTypesToSync) .. currentSettingRecord : "+currentSettingRecord);
                                        getConfigSettingTypesToSync(settingRecords[currentSettingRecord]);
                                   }
                                   else{
                                        //console.log("3 Show (getConfigSettingTypesToSync) .. currentSettingRecord : "+currentSettingRecord);
                                        syncConfigSettingsData(SYNC_SETTINGS_DATA);
                                   }
                            });
                     },
                     function errorCB(err) {
                        alert("Error processing (getConfigSettingTypesToSync) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

/******************************************************************************************************/

/******************************************* Show Data ************************************************/

function getActivityType(){
    myDB.transaction(function getAct1(tx){
                     tx.executeSql('select * from activity_type',[] , function getActCB(tx, results) {
                                   if(results.rows.length){
                                   for(var i=0; i<results.rows.length ;i++){
                                        //console.log("\n ActivityId : "+ results.rows.item(i).activity_type_id+ " \n ParentId : "+ results.rows.item(i).parent_id +"\n Activity : "+results.rows.item(i).name+"\n Qname : "+results.rows.item(i).qname);
                                   }
                                   }
                                   });
                     },
                     function errorCB(err) {
                        alert("Error processing (getActivityType) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getActivity(){
    myDB.transaction(function getAct1(tx){
                     tx.executeSql('select * from activity',[] , function getActCB(tx, results) {
                                   console.log("Show Activities.. "+ results.rows.length)
                                   if(results.rows.length){
                                       for(var i=0; i<results.rows.length ;i++){
                                       console.log(" \n Id : "+ results.rows.item(i).activity_id +"\n ParentId : "+ results.rows.item(i).parent_id +"\n Level : "+results.rows.item(i).level+"\n Activity : "+results.rows.item(i).activity+"\n Type Id : "+ results.rows.item(i).activity_type_id +"\n Remarks : "+results.rows.item(i).remarks+"\n Started on : "+results.rows.item(i).started_on+"\n Ended on : "+results.rows.item(i).ended_on+"\n Start Loc Id : "+results.rows.item(i).started_location_id+"\n End Loc Id : "+results.rows.item(i).completed_location_id+"\n Sync immediate Id : "+results.rows.item(i).synced_immediate+"\n Sync immediate status Id : "+results.rows.item(i).synced_immediate_status+"\n Sync Id : "+results.rows.item(i).sync_activity_id);
                                       
                                       
                                       
                                       }
                                }
                            });
                     },
                     function errorCB(err) {
                        alert("Error processing (getActivity) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getLocation(){
    myDB.transaction(function getAct1(tx){
                     tx.executeSql('select * from location',[] , function getActCB(tx, results) {
                                   console.log("Show Locations.. "+ results.rows.length)
                                   if(results.rows.length){
                                   for(var i=0; i<results.rows.length ;i++){
                                   console.log("\n Id : "+ results.rows.item(i).location_id +"\n Latitude : "+ results.rows.item(i).latitude +"\n latitude text : "+results.rows.item(i).latitude_text+"\n Longitude : "+results.rows.item(i).longitude+"\n longitude text : "+ results.rows.item(i).longitude_text);
                                   }
                                   }
                                   });
                     },
                     function errorCB(err) {
                        alert("Error processing (getLocation) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}

function getConfigSettingTypes(){
    myDB.transaction(function getConfigSettingTypesTX1(tx){
                     tx.executeSql('select * from config_setting_type',[] , function getConfigSettingTypesCB(tx, results) {
                                   //console.log("Show ConfigTypes.. "+ results.rows.length);
                                       if(results.rows.length){
                                       for(var i=0; i<results.rows.length ;i++){
                                           console.log("\n Id : "+ results.rows.item(i).config_setting_type_id +"\n Name : "+ results.rows.item(i).name);
                                       }
                                    }
                            });
                     },
                     function errorCB(err) {
                        alert("Error processing (getConfigSettingTypes) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
}



/**************************************************************************************************/

/**************************************** Delete Data *********************************************/

function deleteTripData(){
    myDB.transaction(function getAct1(tx){
                     tx.executeSql('delete from activity where sync_activity_id = 1 OR synced_immediate = 1',[] , function getActCB(tx, results) {
                                   //console.log("Delete data.. ");
                                   
                                });
                     },
                     function errorCB(err) {
                            alert("Error processing (getAllActivityDataToSync) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    
    
}

/**************************************************************************************************/
/**************************************************************************************************/

/**************************************** check location exist or not *********************************************/



function checkLocation(name){
	 myDB.transaction(function getAct1(tx){
         tx.executeSql('select * from location where location_name = ?',[name] , function getActCB(tx, results) {
                       if(results.rows.length==0){
                    	   checkLocationCB(-1,name);
                       }else{
                    	   // asssign the selected_start_location_id
                    	   checkLocationCB(results.rows.item(0).location_id,name);
                       }
            });
         }, errorCB);
}


function checkEndLocation(name){
	 myDB.transaction(function getAct1(tx){
        tx.executeSql('select * from location where location_name = ?',[name] , function getActCB(tx, results) {
                      if(results.rows.length==0){
                   	   checkEndLocationCB(-1,name);
                      }else{
                   	   // asssign the selected_start_location_id
                   	   checkEndLocationCB(results.rows.item(0).location_id,name);
                      }
           });
        }, errorCB);
}
/*function addLocation(name){
	myDB.transaction(function getAct1(tx){
        tx.executeSql('select * from location where location_name = ?',[name] , function getActCB(tx, results) {
                      if(results.rows.length==0){
                           addLocation(name);
                      }else{
                   	   // asssign the selected_start_location_id
                      }
           });
        }, errorCB);
}*/

function getNearestLocations(location,name){
	var obj=[];
	myDB.transaction(function getAct1(tx){
        tx.executeSql('SELECT location_id,latitude,longitude,location_name from location WHERE location_name <> "Null" AND  location_name LIKE ? LIMIT 3',[name+'%'] , function getActCB(tx, results) {
        		for(var i=0;i<results.rows.length;i++){
                    	 obj[i] = {
                    			 locationName: results.rows.item(i).location_name,
                            	 latitude: results.rows.item(i).latitude,
                            	 longitude: results.rows.item(i).longitude,
                            	 locationId: results.rows.item(i).location_id	 
                    	 };
                 }
                 getNearestLocationsCB(obj);  
        	});
        }, errorCB);
}
