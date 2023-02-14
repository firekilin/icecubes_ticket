


$(()=>{
    if(document.getElementById("Agree")!=null){
        document.getElementById("Agree").click();
    }else if(document.getElementById("EventName")!=null){
        //kktix
 chrome.storage.local.get([
    "tms_using",
    "tms_EventType",
    "tms_GovernmentType",
    "tms_SellTickets",
    "tms_date",
    "tms_start",
    "tms_SubVenuesTagDiv",
    "tms_end",
    "tms_Broadcast",
    "tms_Billboards",
    "tms_Stalls",
    "tms_EventName",
    "tms_EventDescription",
    "tms_EventSportType",
    "tms_EventParticipantsNumber"
  ],(result)=> {



let getticket=$(".ticket-unit.ng-scope").filter(key => $($(".ticket-unit.ng-scope")[key]).find(".ticket-price").text().includes("3,800"));
getticket.find("input").val("1")
window.alert = function(str){
return ;
}
alert("不能彈出警示框");//-->
$(".btn.btn-lg.ng-isolate-scope.btn-primary")
        document.getElementById("EventType").value=result.tms_EventType;
        document.getElementById("GovernmentType").value=result.tms_GovernmentType;
        document.getElementById("SellTickets").value=result.tms_SellTickets
   

  });
  
    }
 

})
   

       
      