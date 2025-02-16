console.log("✅ Content Script Loaded");


function extractQuestionDetails() {
 let title = document.querySelector('a.no-underline[href^="/problems/"]');

  let difficulty = document.querySelector(
    "div.text-difficulty-medium, div.text-difficulty-easy, div.text-difficulty-hard"
  ).innerText;

  let titleHeading = title.innerText;
  let titleLink = title.href;

  let questionData = {
    titleHeading,
    titleLink,
    difficulty,
  };

  console.log("Extracted Data:", questionData); 

  chrome.runtime.sendMessage({
    type: "QUESTION_DATA", data: questionData
  })
  
  return questionData;
}

// Example: Run extraction function when user clicks anywhere
document.addEventListener("click", () => {
  extractQuestionDetails();
});


