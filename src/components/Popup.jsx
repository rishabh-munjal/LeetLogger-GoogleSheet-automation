import React from 'react'
import { useState } from 'react'

function Popup() {

    const [topic, setTopic] = useState("");
    const [note, setNote] = useState("");

    const sendDataToBackground = () =>{
        chrome.runtime.sendMessage({
            type : "SAVE_QUESTIONS",
            data : {topic , note},
        });

        alert("✅ Data Synced")
        setTopic("");
        setNote("");
    }

  return (
    <div className="p-4 w-64">
      <h3 className="text-lg font-bold">Save Question</h3>
      
      <input
        type="text"
        placeholder="Enter Topic Tag"
        className="w-full p-2 border rounded mt-2"
        onChange={(e) => setTopic(e.target.value)}
      />

      <textarea
        placeholder="Write a short note..."
        className="w-full p-2 border rounded mt-2"
        onChange={(e) => setNote(e.target.value)}
      />

      <button
        className="w-full bg-blue-500 text-white py-2 rounded mt-3"
        onClick={sendDataToBackground}
      >
        Save
      </button>
    </div>
  )
}

export default Popup
