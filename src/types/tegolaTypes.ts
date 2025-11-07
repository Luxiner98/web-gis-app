export interface TegolaMapsLayerData {
  tiles: string[];
  name: string;
  minZoom: number;
  maxZoom: number;
}

export interface TegolaMapsData {
  attribution: string;
  bounds: number[];
  capabilities: string;
  center: number[];
  name: string;
  tiles: string[];
  layers: TegolaMapsLayerData[];
}

export interface TegolaData {
  maps: TegolaMapsData[];
  version: string;
}
