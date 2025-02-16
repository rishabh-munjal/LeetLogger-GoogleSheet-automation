console.log("✅ Background Script Loaded");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "QUESTION_DATA") {
        console.log("✅ Received question data", message.data);
       // TODO: Send this data to Google Sheets API
    }


});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    
    if (message.type === "SAVE_QUESTIONS") {
        console.log("📥 Received Data:", message.data);
    
        // TODO: Send this data to Google Sheets API
      }
});



