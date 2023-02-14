
$(()=>{

    
    let icecubes_sys=()=>{
        if(document.getElementById("Agree")!=null){
            document.getElementById("Agree").click();
        }else if(document.getElementById("EventName")!=null){
            //台北市體育局
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
        
        let icediv = document.createElement("div");
        icediv.setAttribute("id", "icecubes_ticket");
        let iceimg =document.createElement("img");
        if(result.tms_using==0){
            iceimg.setAttribute("class","img_icecubes start");
        }else{
            iceimg.setAttribute("class","img_icecubes closed");
        }
        icediv.onclick=()=>{
            if(iceimg.getAttribute("class").includes("closed")){
                chrome.storage.local.set({
                    "tms_using":0,
                  },()=>{
                    location.reload();
                  });
            }else{
                chrome.storage.local.set({
                    "tms_using":1,
                  },()=>{
                    location.reload();
                  });
            }
          
        }
        icediv.append(iceimg);
        $("body").append(icediv);


        if(result.tms_using==0){
            document.getElementById("EventType").value=result.tms_EventType;
            document.getElementById("GovernmentType").value=result.tms_GovernmentType;
            document.getElementById("SellTickets").value=result.tms_SellTickets;
    
    
            let element=document.getElementById("TimePeriodSelect");
            element.value=result.tms_date.substr(0,7);
            if ("createEvent" in document) {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                element.dispatchEvent(evt);
                
            }
            else{
                element.fireEvent("onchange");
            }
    
    
            let subvenueslist=document.getElementById("SubVenuesTagDiv").getElementsByTagName("a");
            for(let i=0;i<subvenueslist.length;i++){
                if(subvenueslist[i].title==result.tms_SubVenuesTagDiv){
                    element=subvenueslist[i];
                    if ("createEvent" in document) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("click", false, true);
                        element.dispatchEvent(evt);
                    }
                    else{
                        element.fireEvent("click");
                    }
            
                }
            }
            setTimeout(()=>{
                
                for(let i=parseInt(result.tms_start);i<(parseInt(result.tms_end)+1);i++){
                    setTimeout(()=>{
    
                    if(document.getElementById("DataPickup."+result.tms_date.replaceAll("-",".")+"."+(i<10?("0"+i):i)+".1").getElementsByTagName("div")[0].innerText==""+(i<10?("0"+i):i)+":00 ~ "+((i+1)<10?("0"+(i+1)):(i+1))+":00" &&
                     !document.getElementById("DataPickup."+result.tms_date.replaceAll("-",".")+"."+(i<10?("0"+i):i)+".1").getElementsByTagName("div")[0].attributes.class.value.includes("Booking"))
                     {
                        element=document.getElementById("DataPickup."+result.tms_date.replaceAll("-",".")+"."+(i<10?("0"+i):i)+".1").getElementsByTagName("div")[0];
                        if ("createEvent" in document) {
                            var evt = document.createEvent("HTMLEvents");
                            evt.initEvent("click", false, true);
                            element.dispatchEvent(evt);
                        }
                        else{
                            element.fireEvent("click");
                        }
                    }
                    },(i-parseInt(result.tms_start))*300);
    
                }
            },2000);
     
            document.getElementById("Broadcast").value=result.tms_Broadcast;
            document.getElementById("Billboards").value=result.tms_Billboards;
        
            document.getElementById("Stalls").value=result.tms_Stalls;
        
            document.getElementById("EventName").value=result.tms_EventName;
        
            document.getElementById("EventDescription").value=result.tms_EventDescription;
            document.getElementById("EventSportType").value=result.tms_EventSportType;
        
            document.getElementById("EventParticipantsNumber").value=result.tms_EventParticipantsNumber;
        
        }
       
    
      });
      
        }
    }


  

    icecubes_sys();
})
   

       
      