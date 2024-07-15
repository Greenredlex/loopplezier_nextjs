// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   MapContainer,
//   TileLayer,
//   Popup,
//   CircleMarker,
//   Polyline,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
// import { useScore } from "@/context/ScoreContext";

// interface NodesData {
//   type: string;
//   features: Node[];
// }

// interface Node {
//   type: string;
//   properties: {
//     knooppunt: number;
//     street_count: number;
//   };
//   geometry: {
//     type: string;
//     coordinates: [number, number];
//   };
// }

// interface RoadsData {
//   type: string;
//   features: Road[];
// }

// interface Road {
//   type: string;
//   properties: {
//     Score: number;
//     length: number;
//     score_bomen: number;
//     score_monumenten: number;
//     score_ovl: number;
//     score_park: number;
//     score_spoor: number;
//     score_water: number;
//     score_wegen: number;
//     score_zitmogelijkheden: number;
//     u: number;
//     v: number;
//   };
//   geometry: {
//     type: string;
//     coordinates: [number, number][];
//   };
// }

// const fetchGeoJSON = async (endpoint: string) => {
//   const response = await fetch(`/api/data?endpoint=${endpoint}`);
//   const data = await response.json();
//   return JSON.parse(data);
// };

// const MapDisplay = () => {
//   const [nodesData, setNodesData] = useState<NodesData | null>(null);
//   // const [roadsData, setRoadsData] = useState<RoadsData | null>(null);
//   const [renderNodes, setRenderNodes] = useState(false);
//   const { score } = useScore();

//   useEffect(() => {
//     fetchGeoJSON("nodes").then(setNodesData);
//     // fetchGeoJSON("roads").then((data) => {
//     //   setRoadsData(data);
//     //   setTimeout(() => setRenderNodes(true), 100);
//     // });
//   }, []);

//   console.log("Map:", score);

//   return (
//     <MapContainer
//       center={[52.35981168158447, 4.908318156554737]}
//       zoom={13}
//       style={{ height: "100vh", width: "100%" }}
//       attributionControl={false}
//       zoomControl={false}
//     >
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//       {score &&
//         score.features.map((road, idx) => (
//           <Polyline
//             key={idx}
//             positions={road.geometry.coordinates.map((coord) => [
//               coord[1],
//               coord[0],
//             ])}
//             color="#f5f0a6"
//           />
//         ))}

//       {renderNodes &&
//         nodesData &&
//         nodesData.features.map((feature, id) => (
//           <CircleMarker
//             key={id}
//             center={[
//               feature.geometry.coordinates[1],
//               feature.geometry.coordinates[0],
//             ]}
//             color="black"
//             radius={1}
//           >
//             <Popup>
//               <div>
//                 <strong>Knooppunt: </strong>
//                 {feature.properties.knooppunt}
//                 <br />
//                 <strong>Street Count: </strong>
//                 {feature.properties.street_count}
//               </div>
//             </Popup>
//           </CircleMarker>
//         ))}
//     </MapContainer>
//   );
// };

// export default MapDisplay;

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
import { useScore } from "@/context/ScoreContext";

interface NodesData {
  type: string;
  features: Node[];
}

interface Node {
  type: string;
  properties: {
    knooppunt: number;
    street_count: number;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface RoadsData {
  type: string;
  features: Road[];
}

interface Road {
  type: string;
  properties: {
    Score: number;
    length: number;
    score_bomen: number;
    score_monumenten: number;
    score_ovl: number;
    score_park: number;
    score_spoor: number;
    score_water: number;
    score_wegen: number;
    score_zitmogelijkheden: number;
    u: number;
    v: number;
  };
  geometry: {
    type: string;
    coordinates: [number, number][];
  };
}

const fetchGeoJSON = async (endpoint: string) => {
  const response = await fetch(`/api/data?endpoint=${endpoint}`);
  const data = await response.json();
  return JSON.parse(data);
};

const getColorForScore = (score) => {
  const colormap = chroma.scale("RdYlGn").domain([-1, 1]); // Adjust the domain based on your score range
  return colormap(score).hex();
};

const MapDisplay = () => {
  const [nodesData, setNodesData] = useState<NodesData | null>(null);
  const [renderNodes, setRenderNodes] = useState(false);
  const { score } = useScore();

  useEffect(() => {
    fetchGeoJSON("nodes").then(setNodesData);
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

      {score &&
        score.features.map((road, idx) => (
          <Polyline
            key={idx}
            positions={road.geometry.coordinates.map((coord) => [
              coord[1],
              coord[0],
            ])}
            color={getColorForScore(road.properties.Score)}
          />
        ))}

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
