import React from 'react'
import { useState } from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

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
    <div className="w-full p-4 bg-white shadow-lg rounded-lg text-center ">
      <p className="text-sm text-gray-600">Developed by <a href="https://github.com/rishabh-munjal" target="_blank" className="font-bold text-blue-500">@rishabh-munjal</a></p>
      <div className="mt-3 flex justify-center gap-4">
        <a href="https://www.linkedin.com/in/rishabh-munjal-591b35230/" target="_blank" className="text-blue-600 text-3xl"><FaLinkedin /></a>
        <a href="https://github.com/rishabh-munjal" target="_blank" className="text-gray-900  text-3xl"><FaGithub /></a>
      </div>
    </div>
  )
}

export default Popup
