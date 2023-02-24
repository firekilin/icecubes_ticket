
$(()=>{

        let ddddOcr=new DdddOcr();

        chrome.storage.local.get([ //取得瀏覽器擴充本地儲存
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
        if(window.location.href.indexOf("activity/detail")>0){ //在detail 頁面 推薦 game頁面
            $("a").each((k,e)=>{  //each 每個都會跑  所以會影響效能
            if($(e).text()=="立即購票"){
                $(e).parent().parent().append($("<a>").attr("href",$(e).attr("href")).text("冰塊:這網址更快"));
            }});
        }

        let iceconsole=$("<div>").attr("style","width: 200px;");
        let icediv = document.createElement("div");
        icediv.setAttribute("id", "icecubes_ticket");
        let iceimg =document.createElement("img");
        if(result.tixcraft_date==null||result.tixcraft_date==''){
            result.tixcraft_quick=false;
            iceconsole.text("未輸入日期");
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
        $(icediv).append(iceconsole);
        $("body").append(icediv);


        if(result.tixcraft_quick){  //如果插件是啟動的

            if(window.location.href.indexOf("activity/detail")>0){
                   
                let restartticket=()=>{ //按下立即購票
                    $("a").each((k,e)=>{
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
              
                restartticket();
                let trygettime=0;
                let tryget = setInterval(function() {
                    trygettime+=1;
                    let showlist=$("tr[class='gridc fcTxt']");
                    if(showlist.length>0){
                        showlist.each((k,e)=>{
                            if($(e).text().replaceAll("-","/").includes(result.tixcraft_date.replaceAll("-","/"))&&
                                $(e).text().includes(result.tixcraft_time)){
                                    
                                    if($(e).find("button").length>0){
                                        let element=$(e).find("button")[0];
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
                    iceconsole.text("(注意)已刷新次數:"+trygettime);
                    
                },500);
            }else if(window.location.href.indexOf("activity/game")>0){
                    let showlist=$("tr[class='gridc fcTxt']");
                    if(showlist.length>0){
                        showlist.each((k,e)=>{
                            if($(e).text().replaceAll("-","/").includes(result.tixcraft_date.replaceAll("-","/"))&&
                                $(e).text().replaceAll(":","").includes(result.tixcraft_time.replaceAll(":",""))){
                                    if($(e).find("button").length>0){
                                        let element=$(e).find("button")[0];
                                        if ("createEvent" in document) {
                                            var evt = document.createEvent("HTMLEvents");
                                            evt.initEvent("click", false, true);
                                            element.dispatchEvent(evt);
                                        }
                                        else{
                                            element.fireEvent("click");
                                        }
                                    }else{
                                        window.location.reload();
                                    }
                            }
                                
                        });
                    }else{
                        window.location.reload();
                    }
            }else if(window.location.href.indexOf("ticket/area")>0){ //選擇區域
                
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
                        $($("div[class='zone area-list']").find("a")).each((k,e)=>{
                            if($(e).text().includes("區")&&arealist[i].includes("區")){
                                if($(e).text().replaceAll(" ","").includes(arealist[i].replaceAll(" ",""))){
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
                            }else{
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
                            }
                            
                        });
                    }
                }
               
                if(result.tixcraft_omg&&!findout){
                    $($("div[class='zone area-list']").find("a")).each((k,e)=>{
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

            }else if(window.location.href.indexOf("ticket/ticket")>0){ //選擇張數
                
                if(result.tixcraft_auto!="human"){
                    let maxcount= $($("#ticketPriceList").find("select")[0]).find("option").length-1;
                    if(maxcount>=result.tixcraft_ticketcount){
                        $($("#ticketPriceList").find("select")[0]).val(result.tixcraft_ticketcount);
                    }else{
                        $($("#ticketPriceList").find("select")[0]).val(maxcount);
                    }  
                }
                /* 舊版本使用之驗證方式解法
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
                });*/

                $("label[for=TicketForm_agree]").click();
                document.getElementById("TicketForm_verifyCode").focus();

                const postgetocrURL =(postdata, callback)=> { //取得圖片base64
                    var xhr = new XMLHttpRequest(); //xhr建立
                    xhr.onload = function() { //xhr基礎設定
                        if(xhr.response!="false"){
                            callback(xhr.response);
                        }
                    };
                    xhr.open('POST', 'https://tixcraftocr.oou.tw/getocr',true);  //設定冰塊伺服器
                    xhr.setRequestHeader('Content-type','application/json');
                    // 格式為 JSON
                    var data = JSON.stringify(postdata); //圖片存進data
                    // 將 JSON 轉為 文字
                    xhr.send(data); //開始傳送
                }
                
                const toDataURL = url => fetch(url)  //設定fetch
                .then(response => response.blob())   //回傳為byte[] 轉 base64
                .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.onerror = reject
                reader.readAsDataURL(blob)
                }))
                const getocrimg = (url,callback)=>{ //傳送圖片
                    toDataURL(url)
                        .then(data => {
                            postgetocrURL(`{"img":"${data.substring(data.indexOf(",")+1)}"}`,callback);
                        });
                }
                const toDataArray = url => fetch(url)
                .then(response => response.arrayBuffer()) // 回傳為 ArrayBuffer
                .then(buffer => new Uint8Array(buffer)) // 轉換成 Uint8Array
              const getocrimgonnx = (url,callback)=>{
                toDataArray(url)
                  .then(data => {
                    console.log(ddddOcr.classification(data));
                  });
              }

                let captchf=()=>{
                    let captchaimg=$('#TicketForm_verifyCode-image').find('img');
                    let captcha=$('#TicketForm_verifyCode-image').attr("src");
                    if(captcha.indexOf('ticket/captcha')>0){
                        getocrimgonnx(captcha,(ocrstring)=>{
                            if(ocrstring.length==4){
                                $('#TicketForm_verifyCode').val(ocrstring);
                                if(result.tixcraft_autosend){
                                    $("#form-ticket-ticket").submit();
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
           
            if($("#checkCode").length>0){
                $("#checkCode").val(result.tixcraft_anser);
                $("#submitButton").click();
            }
            
        }
    });
});
    