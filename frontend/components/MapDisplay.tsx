"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "react-leaflet-markercluster/dist/styles.min.css";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import chroma from "chroma-js";
import { useMapData } from "@/context/MapDataContext";
import { useRouteData } from "@/context/RouteDataContext";
import { NodesData, RoadsData } from "@/types/types";
import L from "leaflet";

const fetchGeoJSON = async (endpoint: string) => {
  const response = await fetch(`/api/data?endpoint=${endpoint}`);
  const data = await response.json();
  return JSON.parse(data);
};

const getColorForScore = (score: number): string => {
  const colormap = chroma.scale("RdYlGn").domain([-1, 1]);
  return colormap(score).hex();
};

const MapDisplay = () => {
  const [nodesData, setNodesData] = useState<NodesData | null>(null);
  const [roadsData, setRoadsData] = useState<RoadsData | null>(null);
  const [renderNodes, setRenderNodes] = useState(false);
  const { mapData } = useMapData();
  const { routeData } = useRouteData();
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("@/pages/dataWorker.js", import.meta.url)
    );

    workerRef.current.onmessage = (e) => {
      const { type, data } = e.data;
      if (type === "DATA_PROCESSED") {
        setRoadsData(data.roads);
        setNodesData(data.nodes);
        setRenderNodes(true);
      }
    };

    const fetchData = async () => {
      const nodes = await fetchGeoJSON("nodes");
      const roads = await fetchGeoJSON("roads");
      workerRef.current?.postMessage({
        type: "PROCESS_DATA",
        data: { nodes, roads },
      });
    };
    fetchData();

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const memoizedRoadsData = useMemo(() => roadsData, [roadsData]);
  const memoizedNodesData = useMemo(() => nodesData, [nodesData]);
  const memoizedMapData = useMemo(() => mapData, [mapData]);
  const memoizedRouteData = useMemo(() => routeData, [routeData]);

  const roadStyle = (feature: any) => ({
    color: getColorForScore(feature.properties.Score),
    weight: 3,
  });

  const routeStyle = {
    color: "#0b6ce3",
    weight: 3,
  };

  const pointToLayer = (feature: any, latlng: L.LatLng) => {
    return L.circleMarker(latlng, {
      radius: 1,
      color: "black",
    });
  };

  const onEachNodeFeature = (feature: any, layer: any) => {
    layer.bindPopup(
      `<div>
        <strong>Knooppunt: </strong>${feature.properties.knooppunt}<br />
        <strong>Street Count: </strong>${feature.properties.street_count}
      </div>`
    );
  };

  return (
    <MapContainer
      center={[52.35981168158447, 4.908318156554737]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
      attributionControl={false}
      zoomControl={false}
      preferCanvas={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {!memoizedMapData && memoizedRoadsData && (
        <GeoJSON data={memoizedRoadsData} style={roadStyle} />
      )}

      {memoizedMapData && <GeoJSON data={memoizedMapData} style={roadStyle} />}

      {memoizedRouteData && (
        <GeoJSON data={memoizedRouteData} style={routeStyle} />
      )}

      {renderNodes && memoizedNodesData && (
        <GeoJSON
          data={memoizedNodesData}
          pointToLayer={pointToLayer}
          onEachFeature={onEachNodeFeature}
        />
      )}
    </MapContainer>
  );
};

export default React.memo(MapDisplay);
