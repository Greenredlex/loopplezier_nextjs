import { Feature, FeatureCollection, Point, LineString } from "geojson";

export interface Scores {
  "Score openbare verlichting": number;
  "Score bomen": number;
  "Score water": number;
  "Score monumenten": number;
  "Score drukke wegen": number;
  "Score parken": number;
  "Start knooppunt": number;
  "Eind knooppunt": number;
  "Minimale afstand": number;
  "Maximale afstand": number;
}

export interface MapData extends FeatureCollection {
  type: "FeatureCollection";
  features: Road[];
}

export interface RouteData extends FeatureCollection {
  type: "FeatureCollection";
  features: Road[];
}

export interface NodesData extends FeatureCollection {
  type: "FeatureCollection";
  features: Node[];
}

export interface Node extends Feature<Point> {
  type: "Feature";
  properties: {
    knooppunt: number;
    street_count: number;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface RoadsData extends FeatureCollection {
  type: "FeatureCollection";
  features: Road[];
}

export interface Road extends Feature<LineString> {
  type: "Feature";
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
    type: "LineString";
    coordinates: [number, number][];
  };
}
