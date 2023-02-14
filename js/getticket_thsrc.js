
  //是否快速確認購票
  var buyticket=false;
  //是否看票
  var lookticket=false;
  //是否跳出提醒  
  var notifycheck=false;
  //是否需要自動確認車次進行搶票(若註解 將提醒不進行搶票)
  var checkgetticket=false;
  //期望 幾點幾分 以後的票(若註解 將以目前車票最晚時間)
  var checkstart='23:59';
  var checklast='23:59';
  
window.onload = function () {
    chrome.storage.local.get([
        "thsrc_buyticket",
        "thsrc_userid",
        "thsrc_phone",
        "thsrc_email",
        "thsrc_lookticket",
        "thsrc_checkgetticket",
        "thsrc_notifycheck",
        "thsrc_start",
        "thsrc_end"
      ],(result)=> {
        buyticket=result.thsrc_buyticket;
        $('#idNumber').val(result.thsrc_userid);
        $('#mobilePhone').val(result.thsrc_phone);
        $('#email').val(result.thsrc_email);
        lookticket=result.thsrc_lookticket;
        notifycheck=result.thsrc_notifycheck;
        checkgetticket=result.thsrc_checkgetticket;
        checkstart=result.thsrc_start;
        checklast=result.thsrc_end;
        thsrc_getticket_start();

        
      });

}

  let thsrc_getticket_start=()=>{


  
console.log("buyticket:"+buyticket);
console.log("lookticket:"+lookticket);

console.log("notifycheck:"+notifycheck);

console.log("checkgetticket:"+checkgetticket);

console.log("checkstart:"+checkstart);
console.log("checklast:"+checklast);

  if($("#BookingS3FormSP").val()!=null){
    if(buyticket){
        
        $("input[name=agree]").prop("checked", true);
        $('#isSubmit').click();
    }
   
  }else if($("#BookingS2Form_TrainQueryDataViewPanel").val()!=null){
    //code start---------

  if(lookticket){

    if(notifycheck){
        if (Notification.permission === 'default' || Notification.permission === 'undefined') {
            Notification.requestPermission(function(permission) {
                if (permission === 'granted') {
                    var notification = new Notification('冰塊說!', {body:'開啟通知'});
                }else{
                    //alert("冰塊只能用彈出視窗提醒你，無法直接通知你");
                }
            });
            }else{
                var notification = new Notification('冰塊說!', {body:'執行中'});
            }    
    }
    if($($($('.uk-flex.uk-flex-middle.result-item')[0]).find($('.departure-time')).find($('span'))[0]).text()<checklast && $($($('.uk-flex.uk-flex-middle.result-item')[0]).find($('.departure-time')).find($('span'))[0]).text()>checkstart){
        setTimeout(()=>{
            $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                    
                    if(checkgetticket){
                        setTimeout(()=>{
                            $(item).find('.uk-radio').click();
                            $('input[name=SubmitButton]').click();
                            clearInterval(tryget);
                        },1000);
                    }
                    if(notifycheck){
                        var notification = new Notification('冰塊說!', {
                            body: '有最新更晚的車票 快點～～～回瀏覽器',
                            requireInteraction: true
                        });
                        return false; // breaks
                        
                    }
                    
                }
            });
        
    },500);
    }
    else if($($($('.uk-flex.uk-flex-middle.result-item')[0]).find($('.departure-time')).find($('span'))[0]).text()>checklast){

        if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').css("visibility")=='hidden'&&$('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').css("visibility")=='hidden'){
            location.reload();
        }else{
            if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').css("visibility")=='hidden'){
                $('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').click();
            }
            setTimeout(()=>{
                if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').css("visibility")=='hidden'){
                    $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                        if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                            
                            if(checkgetticket){
                                setTimeout(()=>{
                                    $(item).find('.uk-radio').click();
                                    $('input[name=SubmitButton]').click();
                                    clearInterval(tryget);
                                },1000);
                                
                            }
                            if(notifycheck){
                                var notification = new Notification('冰塊說!', {
                                    body: '有最新更早的車票 快點～～～回瀏覽器',
                                    requireInteraction: true
                                });
                                return false; // breaks
                            }
                            
                        }
                    });
                
                    console.log(checkstart);
                }else{
                    $('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').click();
                        setTimeout(()=>{
                            $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                            if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                                
                                if(checkgetticket){
                                    setTimeout(()=>{
                                        $(item).find('.uk-radio').click();
                                        $('input[name=SubmitButton]').click();
                                        clearInterval(tryget);
                                    },1000);
                                }
                                if(notifycheck){
                                    var notification = new Notification('冰塊說!', {
                                        body: '有最新更早的車票 快點～～～回瀏覽器',
                                        requireInteraction: true
                                    });
                                    return false; // breaks
                                }
                                
                            }
                        });
                    },500);

                }
            },500);
            
        }

    }else if($($($('.uk-flex.uk-flex-middle.result-item')[0]).find($('.departure-time')).find($('span'))[0]).text()<checkstart){

        if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').css("visibility")=='hidden'&&$('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').css("visibility")=='hidden'){
            location.reload();
        }else{

           
            if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').css("visibility")=='hidden'){
                $('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').click();
            }
            setTimeout(()=>{
                if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').css("visibility")=='hidden'){
                    $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                        if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                            
                            if(checkgetticket){
                                setTimeout(()=>{
                                    $(item).find('.uk-radio').click();
                                    $('input[name=SubmitButton]').click();
                                    clearInterval(tryget);
                                },1000);
                            }
                            if(notifycheck){
                                var notification = new Notification('冰塊說!', {
                                    body: '有最新更晚的車票 快點～～～回瀏覽器',
                                    requireInteraction: true
                                });
                                return false; // breaks
                            }
                            
                        }
                    });
                
                    console.log(checkstart);
                }else{
                    $('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').click();
                        setTimeout(()=>{
                            $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                            if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                                
                                if(checkgetticket){
                                    setTimeout(()=>{
                                        $(item).find('.uk-radio').click();
                                        $('input[name=SubmitButton]').click();
                                        clearInterval(tryget);
                                    },1000);
                                }
                                if(notifycheck){
                                    var notification = new Notification('冰塊說!', {
                                        body: '有最新更晚的車票 快點～～～回瀏覽器',
                                        requireInteraction: true
                                    });
                                    return false; // breaks
                                }
                                
                            }
                        });
                    },500);

                }
            },500);
            
        }
    }

    
    let tryget=setInterval(function() {
        if($($($('.uk-flex.uk-flex-middle.result-item')[0]).find($('.departure-time')).find($('span'))[0]).text()>checklast){

            if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').css("visibility")=='hidden'&&$('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').css("visibility")=='hidden'){
                location.reload();
            }else{
                if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').css("visibility")=='hidden'){
                    $('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').click();
                }
                setTimeout(()=>{
                    if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').css("visibility")=='hidden'){
                        $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                            if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                                
                                if(checkgetticket){
                                    setTimeout(()=>{
                                        $(item).find('.uk-radio').click();
                                        $('input[name=SubmitButton]').click();
                                        clearInterval(tryget);
                                    },1000);
                                    
                                }
                                if(notifycheck){
                                    var notification = new Notification('冰塊說!', {
                                        body: '有最新更早的車票 快點～～～回瀏覽器',
                                        requireInteraction: true
                                    });
                                    return false; // breaks
                                }
                                
                            }
                        });
                    
                        console.log(checkstart);
                    }else{
                        $('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').click();
                            setTimeout(()=>{
                                $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                                if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                                    
                                    if(checkgetticket){
                                        setTimeout(()=>{
                                            $(item).find('.uk-radio').click();
                                            $('input[name=SubmitButton]').click();
                                            clearInterval(tryget);
                                        },1000);
                                    }
                                    if(notifycheck){
                                        var notification = new Notification('冰塊說!', {
                                            body: '有最新更早的車票 快點～～～回瀏覽器',
                                            requireInteraction: true
                                        });
                                        return false; // breaks
                                    }
                                    
                                }
                            });
                        },500);

                    }
                },500);
                
            }

        }else if($($($('.uk-flex.uk-flex-middle.result-item')[0]).find($('.departure-time')).find($('span'))[0]).text()<checkstart){

            if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').css("visibility")=='hidden'&&$('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').css("visibility")=='hidden'){
                location.reload();
            }else{

               
                if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').css("visibility")=='hidden'){
                    $('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_preTrainLink').click();
                }
                setTimeout(()=>{
                    if($('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').css("visibility")=='hidden'){
                        $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                            if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                                
                                if(checkgetticket){
                                    setTimeout(()=>{
                                        $(item).find('.uk-radio').click();
                                        $('input[name=SubmitButton]').click();
                                        clearInterval(tryget);
                                    },1000);
                                }
                                if(notifycheck){
                                    var notification = new Notification('冰塊說!', {
                                        body: '有最新更晚的車票 快點～～～回瀏覽器',
                                        requireInteraction: true
                                    });
                                    return false; // breaks
                                }
                                
                            }
                        });
                    
                        console.log(checkstart);
                    }else{
                        $('#BookingS2Form_TrainQueryDataViewPanel_PreAndLaterTrainContainer_laterTrainLink').click();
                            setTimeout(()=>{
                                $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                                if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                                    
                                    if(checkgetticket){
                                        setTimeout(()=>{
                                            $(item).find('.uk-radio').click();
                                            $('input[name=SubmitButton]').click();
                                            clearInterval(tryget);
                                        },1000);
                                    }
                                    if(notifycheck){
                                        var notification = new Notification('冰塊說!', {
                                            body: '有最新更晚的車票 快點～～～回瀏覽器',
                                            requireInteraction: true
                                        });
                                        return false; // breaks
                                    }
                                    
                                }
                            });
                        },500);

                    }
                },500);
                
            }
        }else{
            setTimeout(()=>{
                    $('.uk-flex.uk-flex-middle.result-item').each((index,item) => {
                        if(checkstart<$($(item).find($('.departure-time')).find($('span'))[0]).text() && checklast>$($(item).find($('.departure-time')).find($('span'))[0]).text()){
                                            
                            if(checkgetticket){
                                setTimeout(()=>{
                                    $(item).find('.uk-radio').click();
                                    $('input[name=SubmitButton]').click();
                                    clearInterval(tryget);
                                    
                                },1000);
                            }
                            if(notifycheck){
                                var notification = new Notification('冰塊說!', {
                                    body: '有最新更晚的車票 快點～～～回瀏覽器',
                                    requireInteraction: true
                                });
                                return false; // breaks
                            }
                            
                        }
                    });
                
            },500);
        }

        
    
    },5000);
    }
    
    
    
  
  
  
  }

  }