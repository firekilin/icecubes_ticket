chrome.webNavigation.onCompleted.addListener(function(details) {
    //設定tixcraft 加速
    if (details.url.indexOf('tixcraft.com/*') !== -1) {
        
        chrome.storage.local.get([
            "tixcraft_beastrun"
          ] ,(result)=> {
            chrome.declarativeNetRequest.getDynamicRules((test)=>{
                if(test.filter(a=>a.id==1001)[0]==null && result.tixcraft_beastrun!=null){
                    fetch(chrome.runtime.getURL('../tixcraft_rules.json'))
                    .then(response => response.json())
                    .then(rules => {
                        chrome.declarativeNetRequest.updateDynamicRules({
                        addRules: rules
                        });
                    }); 
                }else if(test.filter(a=>a.id==1001)[0]!=null && result.tixcraft_beastrun==null){
                    chrome.declarativeNetRequest.updateDynamicRules({
                        removeRuleIds: [1001,1002,1003,1004]
                    });
                }
            })
          });
          (async () => {
            const response = await chrome.runtime.sendMessage({greeting: "hello"});
            // do something with response here, not outside the function
            console.log(response);
          })();
    }
  });

