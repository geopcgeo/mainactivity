

/***********************************************************************************
                              SYNC SETTINGS DATA
***********************************************************************************/

var SYNC_SETTINGS_DATA = [];

var settingRecords = [];

function syncSettingsData(){
    console.log("config setting sync");
    //getConfigSettingsDataToSync();
}

//Sync settings web service callback
function syncConfigSettingsDataCB(obj){
    
}





/***********************************************************************************
                                SYNC TRIP DATA
 ***********************************************************************************/

var activityRecords = [];

function syncAllTripData(){
    getAllActivityDataToSync();
    //Also sync, settings data
    /*if(!window.localStorage.getItem("isConfigSettingSynced")){
        syncSettingsData();
    }*/
}

function syncImmediateTripData(id){
    SYNC_TRIP_DATA = [];
    isImmediate = 1;
    getActivityDataToSyncWithActivityId(id);
    
}

var syncInterval = 0;

//Get the syncIntervalTime from a web service, as for now i have set it to 3 minutes
var syncIntervalTime = 1000*60*3;

function startSync(){
    syncInterval = setInterval(function syncAfterInterval(){
                                    syncAllTripData();
                               
                               },syncIntervalTime);    
}

function stopSync(){
    clearInterval(syncInterval);
    
}

var l_synAllData;
var isSyncComplete = 0;
//To check for sync complete, we have to check the end of last updated record after syncData callback 

//Sync activity web service callback
function syncActivityDataCB(data){
    var wasImmediateSync = data.isImmediate;
    var l_data = data.activityData;
    
    console.log("IsImmediate : "+wasImmediateSync+"||"+l_data[0].activityId);
    
    if(wasImmediateSync){
        l_synAllData = {};
        //for(var i=0;i<l_data.length();i++){
            console.log("Upd after sync immediate : "+l_data[0].activityId+" "+ l_data[0].syncImmediate+" "+l_data[0].syncImmediateStatus);
            updSyncDetailsInActivityWithActivityId(l_data[0].activityId, l_data[0].syncImmediate, l_data[0].syncImmediateStatus, 0);
        //}
    }
    else{
        l_synAllData = data.activityData;
        logSynActivity();
    }
}

var currentStncAllDataUploadId = 0;

//This update occurs if sync all data is done, it will update sync bit with the inserted sync activity id having status as OK
function updActivityDataWithSyncActivityId(syncId){
    console.log("updating all rows with sync id : "+syncId);
//    for(var i=0;i<l_synAllData.length();i++){
//        if(l_synAllData[i].syncStatus=="OK"){
//            updSyncAllDetailsInActivityWithActivityId(l_synAllData[i].activityId, l_synAllData[i].syncImmediate, l_synAllData[i].syncImmediateStatus, syncId);
//        }
//        else
//            updSyncAllDetailsInActivityWithActivityId(l_synAllData[i].activityId, l_synAllData[i].syncImmediate, l_synAllData[i].syncImmediateStatus, 0);
//    }
    currentStncAllDataUploadId = 0;

    if(l_synAllData[currentStncAllDataUploadId].syncStatus=="OK"){
        updSyncAllDetailsInActivityWithActivityId(l_synAllData[currentStncAllDataUploadId].activityId, l_synAllData[currentStncAllDataUploadId].syncImmediate, l_synAllData[currentStncAllDataUploadId].syncImmediateStatus, syncId);
    }
    else
        updSyncAllDetailsInActivityWithActivityId(l_synAllData[currentStncAllDataUploadId].activityId, l_synAllData[currentStncAllDataUploadId].syncImmediate, l_synAllData[currentStncAllDataUploadId].syncImmediateStatus, 0);

}

