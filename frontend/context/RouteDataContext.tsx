import React, { createContext, useState, useContext, ReactNode } from "react";
import { RouteData } from "@/types/types"; // Assuming ResponseType is defined in types.ts

// Define the shape of your context data
interface RouteDataContextType {
  routeData: RouteData | null;
  setRouteData: (data: RouteData) => void;
}

// Create the context
const RouteDataContext = createContext<RouteDataContextType | undefined>(
  undefined
);

// Create a provider component
export const RouteDataProvider = ({ children }: { children: ReactNode }) => {
  const [routeData, setRouteData] = useState<RouteData | null>(null);

  return (
    <RouteDataContext.Provider value={{ routeData, setRouteData }}>
      {children}
    </RouteDataContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useRouteData = () => {
  const context = useContext(RouteDataContext);
  if (context === undefined) {
    throw new Error(
      "useResponseContext must be used within a ResponseProvider"
    );
  }
  return context;
};
