import { ApiDkp, ApiTegola } from "@/api";
import type { CadastralParcelType } from "@/types/cadastralParcelType";
import type { TegolaData } from "@/types/tegolaTypes";
import { Overlay } from "ol";
import type { FeatureLike } from "ol/Feature";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { defaults as defaultControls } from "ol/control";
import MVT from "ol/format/MVT.js";
import { defaults as defaultInteractions } from "ol/interaction";
import TileLayer from "ol/layer/Tile.js";
import VectorTileLayer from "ol/layer/VectorTile";
import { fromLonLat, transformExtent } from "ol/proj";
import OSM from "ol/source/OSM.js";
import VectorTileSource from "ol/source/VectorTile.js";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import {
  type ReactNode,
  type RefObject,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface MapContextData {
  mapElementRef: RefObject<HTMLDivElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;
  tooltipData?: CadastralParcelType;
}

export const MapContext = createContext<MapContextData>({
  mapElementRef: { current: null },
  popupRef: { current: null },
  tooltipData: undefined,
});

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [tooltipData, setTooltipData] = useState<CadastralParcelType>();
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const highlightedIdRef = useRef("");
  const popupRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<Overlay | null>(null);

  const fetchLayerDetails = useCallback(async (id: string) => {
    try {
      //Interface is wrong, needed to create new one
      const data = await ApiDkp.cadastralParcelDetail(id);

      setTooltipData(data.data as never as CadastralParcelType);
      highlightedIdRef.current = id;
    } catch (error) {
      console.error("Failed to fetch layer detilas: ", error);
    }
  }, []);

  useEffect(() => {
    if (!mapElementRef.current) {
      return;
    }

    const croatiaExtent4326 = [13.38, 42.39, 19.45, 46.56];
    const croatiaExtent3857 = transformExtent(croatiaExtent4326, "EPSG:4326", "EPSG:3857");

    const openLayersMap = new Map({
      target: mapElementRef.current,
      layers: [new TileLayer({ source: new OSM() })],
      view: new View({
        center: fromLonLat([16.42, 46.21]),
        zoom: 14,
        extent: croatiaExtent3857,
      }),
      controls: defaultControls(),
      interactions: defaultInteractions(),
    });

    overlayRef.current = new Overlay({
      element: popupRef.current || undefined,
      autoPan: { animation: { duration: 250 } },
    });

    openLayersMap.addOverlay(overlayRef.current);

    const addVectorTileLayer = async () => {
      try {
        //There is no interface set for this response on BE
        const data = await ApiTegola.tegolaTegolaCapabilitiesList();
        const mapsData = (data.data as unknown as TegolaData).maps;
        const cadastralMap = mapsData.find((m) => m.name === "cadastral_parcels");

        if (!cadastralMap) {
          console.warn("cadastral_parcels layer not found");
          return;
        }

        const baseStyle = new Style({
          fill: new Fill({ color: "rgba(255, 0, 0, 0.2)" }),
          stroke: new Stroke({ color: "#ff0000", width: 0.5 }),
        });

        const highlightStyle = new Style({
          fill: new Fill({ color: "rgba(0, 0, 255, 0.2)" }),
          stroke: new Stroke({ color: "#00bfff", width: 2 }),
        });

        const vectorTileLayer = new VectorTileLayer({
          source: new VectorTileSource({
            format: new MVT(),
            url: cadastralMap.tiles[0],
            maxZoom: cadastralMap.layers.find((layer) => layer.name === "cadastral_parcels")?.maxZoom,
            minZoom: cadastralMap.layers.find((layer) => layer.name === "cadastral_parcels")?.minZoom,
          }),
          style: (feature: FeatureLike) => {
            const featureId = feature.getId?.() ?? feature.get("id");
            if (highlightedIdRef.current && featureId === highlightedIdRef.current) {
              return highlightStyle;
            }
            return baseStyle;
          },
        });

        openLayersMap.addLayer(vectorTileLayer);

        openLayersMap.on("singleclick", async (event) => {
          let clickedId = "";

          openLayersMap.forEachFeatureAtPixel(
            event.pixel,
            (feature, layer) => {
              if (layer === vectorTileLayer) {
                clickedId = feature.getId?.() ?? feature.get("id") ?? "";
              }
            },
            { hitTolerance: 0 }
          );

          if (clickedId !== "" && clickedId !== highlightedIdRef.current) {
            await fetchLayerDetails(clickedId);
            vectorTileLayer.changed();
            overlayRef.current?.setPosition(event.coordinate);
          } else if (!clickedId) {
            highlightedIdRef.current = "";
            vectorTileLayer.changed();
            overlayRef.current?.setPosition(undefined);
            setTooltipData(undefined);
          }
        });
      } catch (error) {
        console.error("Failed to fetch Tegola capabilities:", error);
      }
    };

    addVectorTileLayer();

    return () => openLayersMap.setTarget(undefined);
  }, [fetchLayerDetails]);

  const providerValue: MapContextData = useMemo(
    () => ({ mapElementRef, tooltipData, popupRef }),
    [tooltipData]
  );

  return <MapContext.Provider value={providerValue}>{children}</MapContext.Provider>;
};
