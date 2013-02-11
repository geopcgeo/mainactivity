

var clientName = "";
var m_clientId = 0;

var insertedPartyID = 0;

function loadAddClient(){
    
    document.getElementById('addClientDescID').value = "";
    clientName = "";
    
    //Navigate to settings screen
    $.mobile.changePage( "#addClientPage", {
                        transition: "slide",
                        reverse: false
                        });
    
    currentPageId = "#addClientPage";
}

function getClientList(){
    $('#addClientListEndTripID ul').html("");
    refresh("#addClientListEndTripID ul");
    document.getElementById('addClientListEndTripID').style.display = "";
    document.getElementById('addNewDestinationButtonID').style.display = "";
    clientName = "";
    m_clientId = 0;
    getClientListAPI();
}

var clientsData;

function clientListCB(list,err){
    if(!err){
        if(list){
            clientsData = list;
            for(var i=0; i<list.length; i++){
                $('#addClientListEndTripID ul').append("<li style=\"text-transform:capitalize\"><a style=\"font-size:12px; white-space: pre-wrap\" href=\"javascript:selectedClient(clientsData["+i+"].client_name,clientsData["+i+"].client_id)\">"+clientsData[i].client_name+"</a></li>");
            }
            refresh("#addClientListEndTripID ul");
        }
    }
}

function selectedClient(name,id){
    //console.log("Name : "+name);
    document.getElementById('addClientListTitleEndTripID').innerHTML = name;
    clientName = name;
    m_clientId = id;
}

function saveClientInfo(obj){
        addClientData(clientName, destinationClientID,obj);

}

function addClientData(name,id,obj){
    if(id){
        
        myDB.transaction(function getClientIDTX(tx){
                         tx.executeSql('select clientname_id from client where clientname_id = ?',[id],function getClientIDCB(tx,results){
                                           if(results.rows.length){
                                                addPartyData(id,obj);
                                           }
                                           else{
                                                myDB.transaction(function addClientDataTX(tx){
                                                            tx.executeSql('insert into client (clientname,clientname_id) values (?,?)',[name,id],function addClientDataCB(tx,results){
                                                                          //console.log("Inserted Client Id : "+id+" || name "+name);     //Set the inserted id as the current parent activity id
                                                                          addPartyData(id,obj);
                                                                          });
                                                            
                                                            }, function errorCB(err) {
                                                            alert("Error processing (addClientData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                                                            });
                                           }
                                       });
                         
                         }, function errorCB(err) {
                         alert("Error processing (addClientData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                         });
    }
    else{
        updateTripDetails(obj);
    }
}

function addPartyData(id,obj){
    if(id){
        myDB.transaction(function addPartyDataTX(tx){
                     tx.executeSql('insert into party (clientname_id) values (?)',[id],function addClientDataCB(tx,results){
                                       //console.log("Inserted Party Id : "+results.insertId+ " with client id "+id);     //Set the inserted id as the current parent activity id
                                       insertedPartyID = results.insertId;
                                   
                                       updateTripDetails(obj);
                                   });
                     
                     },
                     function errorCB(err) {
                            alert("Error processing (addPartyData) SQL: \n Code : "+err.code+" \n Message : "+err.message);
                     });
    }
    else{
        updateTripDetails(obj);
    }
    
}


