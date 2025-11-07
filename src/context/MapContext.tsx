import Map from "ol/Map.js";
import View from "ol/View.js";
import { defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction";
import TileLayer from "ol/layer/Tile.js";
import { fromLonLat, transformExtent } from "ol/proj";
import OSM from "ol/source/OSM.js";
import { type ReactNode, type RefObject, createContext, useContext, useEffect, useMemo, useRef } from "react";

interface MapContextData {
  mapElementRef: RefObject<HTMLDivElement | null>;
  mapInstanceRef: RefObject<Map | null>;
}

const MapContext = createContext<MapContextData>({
  mapElementRef: { current: null },
  mapInstanceRef: { current: null },
});

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapElementRef.current) {
      return;
    }

    const croatiaExtent4326 = [13.38, 42.39, 19.45, 46.56];
    const croatiaExtent3857 = transformExtent(croatiaExtent4326, "EPSG:4326", "EPSG:3857");

    mapInstanceRef.current = new Map({
      target: mapElementRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([16.42, 46.21]),
        zoom: 15,
        extent: croatiaExtent3857,
      }),
      controls: defaultControls(),
      interactions: defaultInteractions(),
    });

    return () => mapInstanceRef.current?.setTarget(undefined);
  }, []);

  const providerValue: MapContextData = useMemo(() => {
    return {
      mapElementRef,
      mapInstanceRef,
    };
  }, []);

  return <MapContext.Provider value={providerValue}>{children}</MapContext.Provider>;
};

export const useMapContext = () => {
  const context = useContext(MapContext);

  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }

  return context;
};
