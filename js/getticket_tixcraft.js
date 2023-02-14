


$(()=>{
      
  window.alert = function(str){
    return ;
}
        const postgetocrURL =(postdata, callback)=> {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                if(xhr.response!="false"){
                    callback(xhr.response);
                }
                
            };
            xhr.open('POST', 'https://tixcraftocr.oou.tw/getocr',true);
                
                xhr.setRequestHeader('Content-type','application/json');
                // 格式為 JSON
                var data = JSON.stringify(postdata);
                // 將 JSON 轉為 文字
                xhr.send(data);
        }
        
        const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
        }))
        
        const getocrimg = (url,callback)=>{

            toDataURL(url)
                .then(data => {
                    postgetocrURL(`{"img":"${data.substring(data.indexOf(",")+1)}"}`,callback);
                });
        }
    
        chrome.storage.local.get([
        "tixcraft_quick",
        "tixcraft_date",
        "tixcraft_time",
        "tixcraft_auto",
        "tixcraft_area",
        "tixcraft_area2",
        "tixcraft_area3",
        "tixcraft_area4",
        "tixcraft_omg",
        "tixcraft_ocr",
        "tixcraft_anser",
        "tixcraft_autosend",
        "tixcraft_ticketcount"
      ] ,(result)=> {
        
        let icediv = document.createElement("div");
        icediv.setAttribute("id", "icecubes_ticket");
        let iceimg =document.createElement("img");
        if(result.tixcraft_date==null||result.tixcraft_date==''){
            result.tixcraft_quick=false;
            icediv.append("未輸入日期");
        }

        if(result.tixcraft_quick){
            iceimg.setAttribute("class","img_icecubes start");
        }else{
            iceimg.setAttribute("class","img_icecubes closed");
        }
        icediv.onclick=()=>{
            if(iceimg.getAttribute("class").includes("closed")){
                chrome.storage.local.set({
                    "tixcraft_quick":true,
                  },()=>{
                    location.reload();
                  });
            }else{
                chrome.storage.local.set({
                    "tixcraft_quick":false,
                  },()=>{
                    location.reload();
                  });
            }
          
        }
        icediv.append(iceimg);
        $("body").append(icediv);
        if(result.tixcraft_quick){
            
            let restartticket=()=>{
                $("a[class='btn btn-default btn-lg']").each((k,e)=>{
                  if($(e).text()=="立即購票"){
                        let element=e;
                        if ("createEvent" in document) {
                            var evt = document.createEvent("HTMLEvents");
                            evt.initEvent("click", false, true);
                            element.dispatchEvent(evt);
                        }
                        else{
                            element.fireEvent("click");
                        }
                  }});
            }
            $("a[class='btn btn-default btn-lg']").each((k,e)=>{
                if($(e).text()=="立即購票"){
                    let element=e;
                    if ("createEvent" in document) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("click", false, true);
                        element.dispatchEvent(evt);
                    }
                    else{
                        element.fireEvent("click");
                    }
                    
                    
                }
            });
            if(window.location.href.indexOf("activity/detail")>0){
                let tryget = setInterval(function() {
                    let showlist=$("tr[class='gridc fcTxt']");
                    if(showlist.length>0){
                        showlist.each((k,e)=>{
                            if($(e).text().includes(result.tixcraft_date.replaceAll("-","/"))&&
                                $(e).text().includes(result.tixcraft_time)){
                                    
                                    if($(e).find("input").length>0){
                                        let element=$(e).find("input")[0];
                                        if ("createEvent" in document) {
                                            var evt = document.createEvent("HTMLEvents");
                                            evt.initEvent("click", false, true);
                                            element.dispatchEvent(evt);
                                        }
                                        else{
                                            element.fireEvent("click");
                                        }
                                        clearInterval(tryget);
                                    }else{
                                        restartticket();
                                        console.log($(e).text());
                                    }
                            }
                                
                        });
                    }else{
                        restartticket();
                        console.log($(showlist).text());
                    }
                },500);
            }else if(window.location.href.indexOf("activity/game")>0){
                let tryget = setInterval(function() {
                    let showlist=$("tr[class='gridc fcTxt']");
                    if(showlist.length>0){
                        showlist.each((k,e)=>{
                            if($(e).text().includes(result.tixcraft_date.replaceAll("-","/"))&&
                                $(e).text().includes(result.tixcraft_time)){
                                    
                                    if($(e).find("input").length>0){
                                        let element=$(e).find("input")[0];
                                        if ("createEvent" in document) {
                                            var evt = document.createEvent("HTMLEvents");
                                            evt.initEvent("click", false, true);
                                            element.dispatchEvent(evt);
                                        }
                                        else{
                                            element.fireEvent("click");
                                        }
                                        clearInterval(tryget);
                                    }else{
                                        restartticket();
                                        console.log($(e).text());
                                    }
                            }
                                
                        });
                    }else{
                        restartticket();
                        console.log($(showlist).text());
                    }
                },500);
            }
           
            if($("#checkCode").length>0){
                $("#checkCode").val(result.tixcraft_anser);
                $("#submitButton").click();
            }
            if($(".process-wizard-step.active").text().includes("選擇區域")){
                if(result.tixcraft_auto=="human"){
                    
                    $("#select_form_manual").click();
                }
                let arealist=[result.tixcraft_area,result.tixcraft_area2,result.tixcraft_area3,result.tixcraft_area4];
                let findout=false;
                for(let i=0;i<4;i++){
                    if(findout){
                        break;
                    }
                    if(arealist[i]!=""){
                        $($("div[class='area_select col-md-5 col-xs-11 mg-top mg-c line-lf']").find("a")).each((k,e)=>{
                            if($(e).text().replaceAll(" ","").replaceAll("區","").includes(arealist[i].replaceAll(" ","").replaceAll("區",""))){
                                let element=document.getElementById($(e).attr("id"));
                                if ("createEvent" in document) {
                                    var evt = document.createEvent("HTMLEvents");
                                    evt.initEvent("click", false, true);
                                    element.dispatchEvent(evt);
                                    findout=true;
                                }
                                else{
                                    element.fireEvent("click");
                                    findout=true;
                                }
                            }
                        });
                    }
                }
               
                if(result.tixcraft_omg&&!findout){
                    $($("div[class='area_select col-md-5 col-xs-11 mg-top mg-c line-lf']").find("a")).each((k,e)=>{
                            let element=document.getElementById($(e).attr("id"));
                            if ("createEvent" in document) {
                                var evt = document.createEvent("HTMLEvents");
                                evt.initEvent("click", false, true);
                                element.dispatchEvent(evt);
                            }
                            else{
                                element.fireEvent("click");
                            }
                    });
                }

            }else if($(".process-wizard-step.active").text().includes("選擇張數")){
                



                if(result.tixcraft_auto!="human"){
                    let maxcount= $($($("select[class=mobile-select]")[0]).find("option")[$($("select[class=mobile-select]")[0]).find("option").length-1]).text();
                    if(maxcount>=result.tixcraft_ticketcount){
                        $($("select[class=mobile-select]")[0]).val(result.tixcraft_ticketcount);
                    }else{
                        $($("select[class=mobile-select]")[0]).val(maxcount);
                    }  
                }
                
                $("script").each((k,e)=>{
                    if($(e).text().includes("isTrust")){
                        let readline=$(e).text().split('"');
                        for(let i=0;i<readline.length;i++){
            
                            if(readline[i].includes("TicketForm[agree][")){
                                $("label[for=TicketForm_agree]").click();
                                $("#TicketForm_agree").attr("name", readline[i]);
                            }
                        }
                    }
                });
                document.getElementById("TicketForm_verifyCode").focus();
                let captchf=()=>{
                    let captchaimg=$('#TicketForm').find('img');
                    let captcha=$('#TicketForm').find('img').attr("src");
                    if(captcha.includes('ticket/captcha')){
                        getocrimg(captcha,(ocrstring)=>{
                            if(ocrstring.length==4){
                                $('#TicketForm_verifyCode').val(ocrstring);
                                if(result.tixcraft_autosend){
                                    $("#ticketPriceSubmit").click();
                                }
                            }else{
                                
                                    captchaimg.click();
                                
                                captchf();
                            }
                           
                        });
                    }
    
                }
                if(result.tixcraft_ocr){
                    captchf();
                }
            }
            
        }
    });
});
    