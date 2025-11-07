export interface CadastralParcelGeometry {
  type: string;
  coordinates: number[];
}

export interface CadastralParcelProperties {
  parcel_number: string;
  area: string;
  cadastral_municipality: string;
}

export interface CadastralParcelType {
  geometry: CadastralParcelGeometry;
  id: number;
  properties: CadastralParcelProperties;
  type: string;
}
