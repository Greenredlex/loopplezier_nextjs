"use client";

import React from "react";
import ScoreForm from "@/components/ScoreForm";
import dynamic from "next/dynamic";

const MapDisplay = dynamic(() => import("@/components/MapDisplay"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex h-screen w-full">
      <ScoreForm />
      <MapDisplay />
    </div>
  );
}
