import type { CadastralParcelType } from "@/types/cadastralParcelType";
import { type RefObject, createContext, useContext } from "react";

export interface MapContextData {
  mapElementRef: RefObject<HTMLDivElement | null>;
  popupRef: RefObject<HTMLDivElement | null>;
  tooltipData?: CadastralParcelType;
  toggleWMSLayer: () => void;
}

export const MapContext = createContext<MapContextData>({
  mapElementRef: { current: null },
  popupRef: { current: null },
  tooltipData: undefined,
  toggleWMSLayer: () => undefined,
});

export const useMapContext = () => {
  const context = useContext(MapContext);

  if (context === undefined) {
    throw new Error("useMapContext must be used within a MapContextProvider");
  }

  return context;
};
