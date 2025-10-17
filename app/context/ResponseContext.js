"use client";
import React, { createContext, useContext, useState } from "react";

const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
  const [responses, setResponses] = useState([]); 
  // Each item: { message: "...", reconstructedText: "..." }

  return (
    <ResponseContext.Provider value={{ responses, setResponses }}>
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponse = () => useContext(ResponseContext);
