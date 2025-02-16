console.log("✅ Background Script Loaded");

import { CONFIG } from "./config.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if(message.type === "SAVE_TO_SHEETS"){
        console.log("📥 Received Data:", message.data);

        let sheetData = message.data;
        
        async function sendData(){


            let response = await fetch(CONFIG.APP_SCRIPT_ID, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sheetData),
            });

            console.log(response);
        }
        
        sendData();

    }

})






