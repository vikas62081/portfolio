import React, { createContext, useContext, useEffect, useState } from "react";
import ResumeData from "./../resume.json";

const ResumeContext = createContext();

// Create a provider component
export const ResumeProvider = ({ children }) => {
  const resume = ResumeData;

  useEffect(() => {
    document.title = resume.pageTitle;
  }, []);

  return (
    <ResumeContext.Provider value={{ ...resume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeProvider = () => {
  const context = useContext(ResumeContext);

  if (!context) {
    throw new Error("useResumeProvider must be used within a ResumeProvider");
  }

  return context;
};
