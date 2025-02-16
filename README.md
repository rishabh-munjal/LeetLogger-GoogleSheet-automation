

# 📌 Set Up and Use the Chrome Extension Locally

<i> <div style="color : #FFFF00 ">$5 for Chrome Store? Nah, I’d rather spend it on coffee and code! </i></div>

## **1️⃣ Clone the Repository**  
1. Open **Terminal** (or Command Prompt) and run:  
   ```bash
   git clone https://github.com/rishabh-munjal/LeetLogger-DSA-Sheet-automation.git
   ```
2. Navigate to the project folder:  
   ```bash
   cd LeetLogger-GoogleSheet-automation
   ```

---

## **2️⃣ Set Up Google Sheets & App Script**  
### **Step 1: Create a Google Sheet**  
1. Open [Google Sheets](https://docs.google.com/spreadsheets/).
2. Click **Blank Sheet** to create a new one.
3. Rename it to something like **"My Chrome Extension Data"**.
4. Copy the **Sheet ID** from the URL:  
   ```
   https://docs.google.com/spreadsheets/d/THIS_IS_YOUR_SHEET_ID/edit#gid=0
   ```

### **Step 2: Create a Google Apps Script**  
1. Open your **Google Sheet** and click **Extensions → Apps Script**.
2. Delete any existing code and paste this script:
   ```javascript
   
    function doPost(e) {
    var sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([data.title, data.link, data.difficulty , data.topic , data.notes]);


    var response = ContentService.createTextOutput(
        JSON.stringify({ status: "Success", message: "Data added" })
    );
    
    response.setMimeType(ContentService.MimeType.JSON);
    
    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

    return response;
    }

    function doGet(e) {
    var response = ContentService.createTextOutput("");
    response.setMimeType(ContentService.MimeType.JSON);

    response.appendHeader("Access-Control-Allow-Origin", "*");
    response.appendHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

    return response;
    }


   ```
3. Replace **`YOUR_SHEET_ID`** with your actual **Sheet ID**.
4. Click **Save (💾 icon)**.
5. Click **Deploy → New Deployment**.
6. Select **"Web App"** as the deployment type.
7. Set **Who has access? → Anyone**.
8. Click **Deploy** and **Authorize** the script.
9. Copy the **Deployed Web App URL** (it should look like this):
   ```
   https://script.google.com/macros/s/XXXXXXXXXX/exec
   ```

---

## **3️⃣ Add Script URL to `config.js`**
1. Open the **`config.js`** file in your project.
2. Add this line:
   ```javascript
   const APP_SCRIPT_URL = "YOUR_DEPLOYED_SCRIPT_URL_HERE";
   export default APP_SCRIPT_URL;
   ```
3. Replace **`YOUR_DEPLOYED_SCRIPT_URL_HERE`** with the URL you copied earlier.

---

## **4️⃣ Load the Extension in Chrome**  
1. Open **Google Chrome**.
2. Go to `chrome://extensions/`.
3. Enable **Developer Mode** (toggle in the top-right).
4. Click **"Load Unpacked"**.
5. Select the folder **where your extension is saved**.
6. The extension should now be installed!

---
# ➕ Upcomming Features

    1. Automate extension setup
    2. Topic wise Sheet Creation & sorting
    3. List extension on WebStore

# ✒️ Demonstration

<video width="320" height="240" controls >
<source src="./Screen Recording 2025-02-17 014424.mp4" type = "video/mp4">
</video>


