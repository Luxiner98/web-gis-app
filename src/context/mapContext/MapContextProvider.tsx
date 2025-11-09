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
import { TileWMS } from "ol/source";
import OSM from "ol/source/OSM.js";
import VectorTileSource from "ol/source/VectorTile.js";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MapContext, type MapContextData } from "./useMapContext";

interface WMSLayers {
  corine12WMSLayer: TileLayer | null;
  corine13WMSLayer: TileLayer | null;
}

export const MapContextProvider = ({ children }: { children: ReactNode }) => {
  const [tooltipData, setTooltipData] = useState<CadastralParcelType>();
  const isWMSVisibleRef = useRef(true);
  const highlightedIdRef = useRef("");
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const mapRef = useRef<Map | null>(null);
  const wmsLayersRef = useRef<WMSLayers>({ corine12WMSLayer: null, corine13WMSLayer: null });

  const fetchLayerDetails = useCallback(async (id: string) => {
    try {
      const data = await ApiDkp.cadastralParcelDetail(id);
      setTooltipData(data.data as never as CadastralParcelType);
      highlightedIdRef.current = id;
    } catch (error) {
      console.error("Failed to fetch layer details: ", error);
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

    mapRef.current = openLayersMap;

    const corine12WMSLayer = new TileLayer({
      source: new TileWMS({
        url: "https://image.discomap.eea.europa.eu/arcgis/services/Corine/CLC2018_WM/MapServer/WMSServer",
        params: {
          LAYERS: 12,
        },
        serverType: "geoserver",
      }),
      visible: false,
      opacity: 0.5,
    });

    const corine13WMSLayer = new TileLayer({
      source: new TileWMS({
        url: "https://image.discomap.eea.europa.eu/arcgis/services/Corine/CLC2018_WM/MapServer/WMSServer",
        params: {
          LAYERS: 13,
        },
        serverType: "geoserver",
      }),
      visible: true,
      opacity: 0.5,
    });

    wmsLayersRef.current = { corine12WMSLayer, corine13WMSLayer };
    openLayersMap.addLayer(corine12WMSLayer);
    openLayersMap.addLayer(corine13WMSLayer);

    openLayersMap.getView().on("change:resolution", () => {
      if (!isWMSVisibleRef.current) {
        corine12WMSLayer.setVisible(false);
        corine13WMSLayer.setVisible(false);
        return;
      }

      const zoom = openLayersMap.getView().getZoom();
      if (zoom !== undefined) {
        wmsLayersRef.current.corine12WMSLayer?.setVisible(zoom <= 10);
        wmsLayersRef.current.corine13WMSLayer?.setVisible(zoom > 10);
      }
    });

    overlayRef.current = new Overlay({
      element: popupRef.current || undefined,
      autoPan: { animation: { duration: 250 } },
    });
    openLayersMap.addOverlay(overlayRef.current);

    const addVectorTileLayer = async () => {
      try {
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
            const featureId = feature.getId?.() || feature.get("id");
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
                clickedId = feature.getId?.() || feature.get("id") || "";
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

    return () => {
      openLayersMap.setTarget(undefined);
    };
  }, [fetchLayerDetails]);

  const toggleWMSLayer = useCallback(() => {
    const { corine12WMSLayer, corine13WMSLayer } = wmsLayersRef.current;
    if (!corine12WMSLayer || !corine13WMSLayer) {
      return;
    }

    if (!isWMSVisibleRef.current) {
      const zoom = mapRef.current?.getView().getZoom() || 0;
      corine12WMSLayer.setVisible(zoom <= 10);
      corine13WMSLayer.setVisible(zoom > 10);
    } else {
      corine12WMSLayer.setVisible(false);
      corine13WMSLayer.setVisible(false);
    }

    isWMSVisibleRef.current = !isWMSVisibleRef.current;
  }, []);

  const providerValue: MapContextData = useMemo(
    () => ({
      mapElementRef,
      tooltipData,
      popupRef,
      toggleWMSLayer,
    }),
    [tooltipData, toggleWMSLayer]
  );

  return <MapContext.Provider value={providerValue}>{children}</MapContext.Provider>;
};
