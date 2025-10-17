"use client";
import React, { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useResponse } from "@/app/context/ResponseContext";
const Footer = () => {
  const [fileName, setFileName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const { setResponses } = useResponse();
  const router = useRouter();
  const handleSubmit = async () => {
    if (!message && !file) {
      alert("Please provide a message or file");
      return;
    }
    const formData = new FormData();
    formData.append("message", message);
    if (file) formData.append("file", file);
    const res = await fetch("/api/reconstruct", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setResponses((prev) => [
      ...prev,{ message, reconstructedText: data.reconstructedText },
    ]);
    setMessage("");
    setFile(null);
    setFileName("");
    router.push("/user/input"); 
  };

  return (
    <div className="footerdetails text-white">
      <div className="footercontent">
        <div className="footer backdrop-blur-md bg-black/40 border-t border-[#9b6b35]/70 px-6 py-3 flex items-center justify-between">
          <label
            htmlFor="fileInput"
            className="flex items-center gap-2 cursor-pointer text-[#f5e6c8] hover:text-[#ffdf9e] transition-all duration-300 font-Ciz">
            <Paperclip className="w-5 h-5" />
            <span className="text-sm tracking-wide">
              {fileName || "Attach File"}
            </span>
          </label>
          <input id="fileInput" type="file" className="hidden" onChange={(e) => {setFile(e.target.files[0]); setFileName(e.target.files[0]?.name || "");}}/>
          <input type="text" placeholder="Type your message" value={message} onChange={(e) => setMessage(e.target.value)}className="w-[70%] bg-transparent border border-[#9b6b35]/70 text-[#f5e6c8] placeholder-[#bfa887]/70 rounded-xl px-4 py-2 outline-none focus:border-[#ffdf9e] transition-all duration-300"/>
          <button onClick={handleSubmit} className="ml-3 flex items-center gap-2 bg-[#9b6b35]/70 hover:bg-[#c48a44] text-[#f5e6c8] font-Ciz px-5 py-2 rounded-xl border border-[#ffdf9e]/40 shadow-md hover:shadow-[#ffdf9e]/40 transition-all duration-300">
            <Send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
