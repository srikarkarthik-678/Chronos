"use client";
import React, { useEffect, useState } from "react";
import BlurText from "@/app/react/animations/page";
import { useResponse } from "@/app/context/ResponseContext";
const Page = () => {
  const [oncompletion, setoncompletion] = useState(true);
  const [loading, setLoading] = useState(true);
  const { responses } = useResponse();
  useEffect(() => {
    const timec = setTimeout(() => setoncompletion(false), 5000);
    return () => clearTimeout(timec);
  }, []);
  useEffect(() => {
    setLoading(false);
    console.log("hello")
  }, [responses]);

  return (
    <div className="mainsection text-white font-Ciz overflow-y-scroll h-[80vh] scrollbar-thumb-[#9b6b35] scrollbar-track-[#1a1a1a]">
      <div className="maindetails px-6 py-4">
        {oncompletion ? (
          <div className="maincontent flex flex-col justify-center items-center h-[550px]">
            <BlurText
              text="Hello User!"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-4xl mb-8"
            />
          </div>
        ) : (
          <div className="conversation space-y-4 flex flex-col justify-start min-h-[200px]">
            {loading ? (
              <p className="text-[#ffdf9e] text-center text-xl animate-pulse mt-4">
                Processing your input...
              </p>
            ) : responses.length === 0 ? (
              <>
              <p className="text-[#bfa887]  text-md mt-4">No inputs yet. Try sending one!</p>
              <p className="text-[#bfa887]  text-md mt-4">Wait For 5 to 10 seconds to get the Gemini response after clicking the send button</p>
              </>
              
            ) : (
              responses.map((item, index) => (
                <div key={index} className="border border-[#9b6b35]/60 rounded-xl p-4 bg-black/30">
                  <p className="text-[#ffdf9e] font-semibold">
                    Your Input: <span className="font-normal">{item.message}</span>
                  </p>
                  <p className="text-[#f5e6c8] mt-2">
                    Gemini Reconstruction:
                    <span className="font-normal">{item.reconstructedText}</span>
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

