"use client";

import React, { useState } from "react";
import { MapDataProvider } from "@/context/MapDataContext";
import { RouteDataProvider } from "@/context/RouteDataContext";
import ScoreForm from "@/components/ScoreForm";
import dynamic from "next/dynamic";

const MapDisplay = dynamic(() => import("@/components/MapDisplay"), {
  ssr: false,
});

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <MapDataProvider>
      <RouteDataProvider>
        <div className="relative flex h-screen w-full">
          <div
            className={`fixed top-0 left-0 h-screen bg-[#262730] shadow-lg z-40 transform transition-transform duration-500 sm:border border-r-[#44454d] border-y-transparent border-l-transparent ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="absolute sm:hidden top-0 right-0 m-4">
              <div
                className="flex justify-center items-center w-8 h-8 text-white border rounded cursor-pointer"
                onClick={toggleDrawer}
              >
                <p>X</p>
              </div>
            </div>

            <div className="overflow-auto h-full">
              <ScoreForm />
            </div>

            <div className="absolute top-[50%] right-[-24px]">
              <div
                className="flex justify-center items-center w-6 h-16 text-white bg-[#262730] cursor-pointer translate-y-[-50%]"
                onClick={toggleDrawer}
              >
                <div>
                  <div className="absolute top-0 w-0 h-0 border-l-[0px] border-l-transparent border-b-[24px] border-b-[#262730] border-r-[24px] border-r-transparent translate-y-[-100%] translate-x-[-7px]"></div>
                  {isDrawerOpen ? "<" : ">"}
                  <div className="absolute bottom-0 w-0 h-0 border-l-[0px] border-l-transparent border-t-[24px] border-t-[#262730] border-r-[24px] border-r-transparent translate-y-[100%] translate-x-[-7px]"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow z-10">
            <MapDisplay />
          </div>
        </div>
      </RouteDataProvider>
    </MapDataProvider>
  );
}
