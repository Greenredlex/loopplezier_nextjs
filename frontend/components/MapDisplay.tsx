"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import chroma from "chroma-js";
import { useResponse } from "@/context/ResponseContext";
import { NodesData, RoadsData, Road } from "@/types/types";

const fetchGeoJSON = async (endpoint: string) => {
  const response = await fetch(`/api/data?endpoint=${endpoint}`);
  const data = await response.json();
  return JSON.parse(data);
};

const getColorForScore = (score: number): string => {
  const colormap = chroma.scale("RdYlGn").domain([-1, 1]);
  return (colormap(score) as chroma.Color).hex();
};

const MapDisplay = () => {
  const [nodesData, setNodesData] = useState<NodesData | null>(null);
  const [roadsData, setRoadsData] = useState<RoadsData | null>(null);
  const [renderNodes, setRenderNodes] = useState(false);
  const { response } = useResponse();

  console.log(response);

  useEffect(() => {
    fetchGeoJSON("nodes").then(setNodesData);
    fetchGeoJSON("roads").then((data) => {
      setRoadsData(data);
      setTimeout(() => setRenderNodes(true), 100);
    });
  }, []);

  return (
    <MapContainer
      center={[52.35981168158447, 4.908318156554737]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      attributionControl={false}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {response &&
        response.features.map((road: Road, idx: number) => (
          <Polyline
            key={idx}
            positions={road.geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ])}
            color={getColorForScore(road.properties.Score)}
          />
        ))}

      {/* {roadsData &&
        roadsData.features.map((road, idx) => (
          <Polyline
            key={idx}
            positions={road.geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ])}
            color={getColorForScore(road.properties.Score)}
            weight={3}
          />
        ))} */}

      {renderNodes &&
        nodesData &&
        nodesData.features.map((feature, id) => (
          <CircleMarker
            key={id}
            center={[
              feature.geometry.coordinates[1],
              feature.geometry.coordinates[0],
            ]}
            color="black"
            radius={1}
          >
            <Popup>
              <div>
                <strong>Knooppunt: </strong>
                {feature.properties.knooppunt}
                <br />
                <strong>Street Count: </strong>
                {feature.properties.street_count}
              </div>
            </Popup>
          </CircleMarker>
        ))}
    </MapContainer>
  );
};

export default MapDisplay;
