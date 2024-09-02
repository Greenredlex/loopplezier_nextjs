import React, { createContext, useState, useContext, ReactNode } from "react";
import { ResponseData } from "@/types/types"; // Assuming ResponseType is defined in types.ts

// Define the shape of your context data
interface ResponseContextType {
  response: ResponseData | null;
  setResponse: (data: ResponseData) => void;
}

// Create the context
const ResponseContext = createContext<ResponseContextType | undefined>(
  undefined
);

// Create a provider component
export const ResponseProvider = ({ children }: { children: ReactNode }) => {
  const [response, setResponse] = useState<ResponseData | null>(null);

  return (
    <ResponseContext.Provider value={{ response, setResponse }}>
      {children}
    </ResponseContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useResponse = () => {
  const context = useContext(ResponseContext);
  if (context === undefined) {
    throw new Error(
      "useResponseContext must be used within a ResponseProvider"
    );
  }
  return context;
};
