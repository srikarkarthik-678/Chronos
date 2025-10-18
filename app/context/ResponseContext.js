"use client";
import React, { createContext, useContext, useState } from "react";

const ResponseContext = createContext();

export const ResponseProvider = ({ children }) => {
  const [responses, setResponses] = useState([]); 
  const [loading, setLoading] = useState(false);
  return (
    <ResponseContext.Provider value={{ responses, setResponses,loading,setLoading }}>
      {children}
    </ResponseContext.Provider>
  );
};

export const useResponse = () => useContext(ResponseContext);
