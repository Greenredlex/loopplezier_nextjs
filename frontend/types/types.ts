export interface Scores {
  "Score openbare verlichting": number;
  "Score bomen": number;
  "Score water": number;
  "Score monumenten": number;
  "Score drukke wegen": number;
  "Score parken": number;
  "Start knooppunt": number,
  "Eind knooppunt": number,
  "Minimale afstand": number,
  "Maximale afstand": number,
  }

export interface MapData {
  type: string;
  features: Road[];
  }

export interface RouteData {
  type: string;
  features: Road[];
  }

export interface NodesData {
  type: string;
  features: Node[];
}

export interface Node {
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

export interface RoadsData {
  type: string;
  features: Road[];
}

export interface Road {
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