console.log("✅ Content Script Loaded");

function extractQuestionDetails() {
  let title = document.querySelector('a.no-underline[href^="/problems/"]');

  let difficulty = document.querySelector(
    "div.text-difficulty-medium, div.text-difficulty-easy, div.text-difficulty-hard"
  )?.innerText;

  let titleHeading = title?.innerText || "Unknown Title";
  let titleLink = title?.href || "Unknown Link";

  let questionData = {
    titleHeading,
    titleLink,
    difficulty,
  };

  console.log("Extracted Data:", questionData);

  localStorage.setItem("leetlogger-title", titleHeading);
  localStorage.setItem("leetlogger-link", titleLink);
  localStorage.setItem("leetlogger-difficulty", difficulty);

  return questionData;
}

// * Injecting Floating Form & Toggle Button CSS to the Page
function injectForm() {
  if (document.getElementById("leetlogger-form-container")) return; // Prevent multiple injections

  const formContainer = document.createElement("div");
  formContainer.id = "leetlogger-form-container";
  formContainer.style.display = "none"; // Initially hidden

  formContainer.innerHTML = `
    <style>
      #leetlogger-form-container {
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: #262626;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        width: 300px;
        z-index: 9999;
        font-family: Arial, sans-serif;
        border: 1px solid #262626;
      }

      #leetlogger-form-container h2 {
        color: #ffa116;
        text-align: center;
        font-size: 18px;
        margin-bottom: 10px;
      }

      #leetlogger-form-container .input-group {
        margin-bottom: 10px;
      }

      #leetlogger-form-container label {
        font-size: 14px;
        color: #f5f5f5;
        margin-bottom: 5px;
        display: block;
      }

      #leetlogger-form-container select,
      #leetlogger-form-container textarea {
        width: 100%;
        padding: 8px;
        border-radius: 5px;
        font-size: 14px;
        background: #262626;
        color: #fff;
        border: 1px solid #333;
      }

      #leetlogger-form-container select:focus,
      #leetlogger-form-container textarea:focus {
        border-color: #ffa116;
      }

      #leetlogger-form-container button {
        width: 100%;
        padding: 7px;
        border-radius: 5px;
        background: #ffa116;
        color: #1a1a1a;
        font-weight: bold;
        font-size: 12px;
        cursor: pointer;
        text-align: center;
        display: block;
        margin-top: 10px;
        border: none;
      }

      #leetlogger-form-container button:hover {
        background: #cc7f0a;
      }

      /* Toggle Button */
      #leetlogger-toggle {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #262626;
        color: #1a1a1a;
        padding: 2px 2px;
        font-size: 20px;
        font-weight: bold;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        z-index: 10000;
      }

      #leetlogger-toggle:hover {
        background: #333333;
      }
    </style>

    <div id="leetlogger-form">
      <div class="input-group">
        <label for="leetlogger-topic">Topic Tag:</label>
        <select id="leetlogger-topic" required>
          <option value="" disabled selected>Select a topic</option>
          <option value="arrays">Arrays</option>
          <option value="linked-lists">Linked Lists</option>
          <option value="stacks">Stacks</option>
          <option value="queues">Queues</option>
          <option value="hashing">Hashing</option>
          <option value="trees">Trees</option>
          <option value="graphs">Graphs</option>
          <option value="sorting">Sorting</option>
          <option value="searching">Searching</option>
          <option value="dynamic-programming">Dynamic Programming</option>
          <option value="greedy-algorithms">Greedy Algorithms</option>
          <option value="backtracking">Backtracking</option>
          <option value="bit-manipulation">Bit Manipulation</option>
          <option value="recursion">Recursion</option>
        </select>
      </div>
      <div class="input-group">
        <label for="leetlogger-notes">Notes:</label>
        <textarea id="leetlogger-notes" placeholder="Write notes here..." required></textarea>
      </div>
      <button type="submit" id="leetlogger-save">Sync Data</button>
    </div>
  `;

  document.body.appendChild(formContainer);

  // Toggle Button
  const toggleButton = document.createElement("button");
  toggleButton.id = "leetlogger-toggle";
  toggleButton.innerText = "✒️";
  document.body.appendChild(toggleButton);

  toggleButton.addEventListener("click", () => {
    if (formContainer.style.display === "none") {
      formContainer.style.display = "block";
    } else {
      formContainer.style.display = "none";
    }
  });

  // Handle form submission
  document.getElementById("leetlogger-save").addEventListener("click", () => {
    const topic = document.getElementById("leetlogger-topic").value;
    const notes = document.getElementById("leetlogger-notes").value;

    if (!topic) {
      alert("⚠️ Please select a topic before saving!");
      return;
    }

    let questionData = {
      title: localStorage.getItem("leetlogger-title"),
      link: localStorage.getItem("leetlogger-link"),
      difficulty: localStorage.getItem("leetlogger-difficulty"),
      topic,
      notes,
    };

    chrome.runtime.sendMessage({
      type: "SAVE_TO_SHEETS",
      data: questionData,
    });

    alert("✅ Sheet updated successfully!");
    formContainer.style.display = "none"; 
  });
}

setTimeout(injectForm, 1000);
setTimeout(extractQuestionDetails, 1000);

