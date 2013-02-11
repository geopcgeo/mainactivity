
var BASE_URL = "";
var LOGIN_URL = "";
var VALIDATE_PASSWORD_URL = "";
var REFRESH_INTERVAL_URL = "";


var queue = {
    activity : []
};


//Activity Types
var activityTypes =
[
 {id: 1, parent_id: 0, level: 0, name: "Login", qname: "Login", remarks:""},
 {id: 2, parent_id: 1, level: 1, name: "Authentication Request", qname: "Login::Authentication Request", remarks:""},
 {id: 3, parent_id: 1, level: 1, name: "Authentication Response", qname: "Login::Authentication Response", remarks:"Login Successfull"},
 
 {id: 500, parent_id: 0, level: 0, name: "Trip", qname: "Trip", remarks:""},
 {id: 501, parent_id: 500, level: 1, name: "Start Trip", qname: "Trip::Start Trip", remarks:""},
 {id: 502, parent_id: 500, level: 1, name: "Intermediate Location", qname: "Trip::Intermediate Location", remarks:""},
 {id: 503, parent_id: 500, level: 1, name: "Complete Trip", qname: "Trip::Complete Trip", remarks:""},
 {id: 504, parent_id: 500, level: 1, name: "Confirm Destination", qname: "Trip::Confirm Destination", remarks:""},
 
 {id: 1500, parent_id: 0, level: 0, name: "Toll", qname: "Toll", remarks:""},
 {id: 1501, parent_id: 1500, level: 1, name: "Add Toll", qname: "Toll::Add Toll", remarks:""},
 
 {id: 2000, parent_id: 0, level: 0, name: "Note", qname: "Note", remarks:""},
 {id: 2001, parent_id: 2000, level: 1, name: "Add Note", qname: "Note::Add Note", remarks:""},
 
 {id: 2500, parent_id: 0, level: 0, name: "Logout", qname: "Logout", remarks:""},
 
 {id: 3000, parent_id: 0, level: 0, name: "Enterprise Synchronization", qname: "Enterprise Synchronization", remarks:""},
 {id: 3001, parent_id: 3000, level: 1, name: "Activity", qname: "Enterprise Synchronization::Activity", remarks:""},
 {id: 4000, parent_id: 0, level: 0, name: "Device Telemetery", qname: "Device Telemetery", remarks:""},
 {id: 4001, parent_id: 4000, level: 1, name: "Pause", qname: "Device Telemetery::Pause", remarks:""},
 {id: 4002, parent_id: 4000, level: 1, name: "Resume", qname: "Device Telemetery::Resume", remarks:""},
 {id: 4003, parent_id: 4000, level: 1, name: "Online", qname: "Device Telemetery::Online", remarks:""},
 {id: 4004, parent_id: 4000, level: 1, name: "Offline", qname: "Device Telemetery::Offline", remarks:""},
 
 {id: 5000, parent_id: 0, level: 0, name: "Auto Login", qname: "Auto Login", remarks:""}
];

//locatiopn types

var locationTypes=
[
 {id:8000, name:"from_mobile"},
 {id:8001, name:"from_enterprise_db"},
 {id:8002, name:"unknown_source"}
];


//Config Settings Types
var configSettingsTypes =
[
 //{id: 10, name: "ENTERPRISE_APP_HOST_NAME", is_runtime_const: 1, remarks:"", value : "192.168.110.48"},
 //{id: 11, name: "ENTERPRISE_APP_BASE_URL", is_runtime_const: 1, remarks:"",  value : "http://192.168.110.48:8080/MECARS/index.php"},
 //{id: 11, name: "ENTERPRISE_APP_BASE_URL", is_runtime_const: 1, remarks:"",  value : "http://devl.enterprise.mecars.ryohee.com/src/"},
 {id: 11, name: "ENTERPRISE_APP_BASE_URL", is_runtime_const: 1, remarks:"",  value : "http://devl.enterprise.ryohee.com"},
 //{id: 12, name: "ENTERPRISE_APP_PORT", is_runtime_const: 1, remarks:"",  value : "8080"},
 {id: 100, name: "ENTERPRISE_SERVICE_URL_LOGIN", is_runtime_const: 1, remarks:"",  value : "/api/mobile/auth/authenticate-login/"},
 {id: 101, name: "ENTERPRISE_SERVICE_URL_VALIDATE_PASSWORD", is_runtime_const: 1, remarks:"",  value : "/api/mobile/auth/change-password/"},
 {id: 102, name: "ENTERPRISE_SERVICE_URL_REFRESH_INTERVAL", is_runtime_const: 1, remarks:"",  value : "/api/mobile/config/setting/refresh-interval/"},
 {id: 103, name: "ENTERPRISE_SERVICE_URL_DESTINATIONS", is_runtime_const: 1, remarks:"",  value : "/api/mobile/destinations/"},
 {id: 104, name: "ENTERPRISE_SERVICE_URL_FREQUENT_TOLLS", is_runtime_const: 1, remarks:"",  value : "/api/mobile/frequent-tolls/"},
 {id: 105, name: "ENTERPRISE_SERVICE_URL_START_LOCATION_DATA", is_runtime_const: 1, remarks:"",  value : "/api/mobile/trip/start-trip-location-data/"},
 {id: 106, name: "ENTERPRISE_SERVICE_URL_ADD_NEW_DESTINATION", is_runtime_const: 1, remarks:"",  value : "/api/mobile/destinations/new-destination/"},
 {id: 107, name: "ENTERPRISE_SERVICE_URL_ADD_NEW_ADDRESS_REQUEST", is_runtime_const: 1, remarks:"",  value : "/api/mobile/destinations/new-address-request/"},
 {id: 108, name: "ENTERPRISE_SERVICE_URL_SYNC_TRIP_DATA", is_runtime_const: 1, remarks:"",  value : "/api/mobile/trip/sync-trip-data/"},
 {id: 109, name: "ENTERPRISE_SERVICE_URL_SYNC_SETTINGS_DATA", is_runtime_const: 1, remarks:"",  value : "/api/mobile/config/setting/sync-settings-data/"},
 {id: 110, name: "ENTERPRISE_SERVICE_URL_SEND_FEEDBACK", is_runtime_const: 1, remarks:"",  value : "/api/mobile/feedback/send-feedback/"},
  {id: 111, name: "ENTERPRISE_SERVICE_URL_CLIENTS", is_runtime_const: 1, remarks:"",  value : "/api/mobile/clients/"},
 {id: 201, name: "DAILY_COMMUTES", is_runtime_const: 0, remarks:"",  value : ""}

 ];

var SETTINGS = {};

//1. SQL get all config settings that are is_runtime_const == 1
//2. loop through each setting, then call eval('var ' + name + '=' + value)

var TOLLS = [];

var TOLL = {};

var NOTE = {};

var PARENT_ACTIVITY_ID = {};

var MY_TRIP = {};

var isShowToll = 0;
var isShowNote = 0;

var startLocationName = "";

var tempEditTripLogID = 0;

var removeDataAtDate = "";