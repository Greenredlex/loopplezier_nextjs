import React, { createContext, useState, useContext, ReactNode } from "react";
import { MapData } from "@/types/types"; // Assuming ResponseType is defined in types.ts

// Define the shape of your context data
interface MapDataContextType {
  mapData: MapData | null;
  setMapData: (data: MapData) => void;
}

// Create the context
const MapDataContext = createContext<MapDataContextType | undefined>(undefined);

// Create a provider component
export const MapDataProvider = ({ children }: { children: ReactNode }) => {
  const [mapData, setMapData] = useState<MapData | null>(null);

  return (
    <MapDataContext.Provider value={{ mapData, setMapData }}>
      {children}
    </MapDataContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useMapData = () => {
  const context = useContext(MapDataContext);
  if (context === undefined) {
    throw new Error(
      "useResponseContext must be used within a ResponseProvider"
    );
  }
  return context;
};
