import { useMapContext } from "@/context";
import "ol/ol.css";
import type { ReactNode } from "react";

interface OpenLayersMapProps {
  children: ReactNode;
}

export const OpenLayersMap = ({ children }: OpenLayersMapProps) => {
  const { mapElementRef } = useMapContext();
  return (
    <div ref={mapElementRef} className="w-screen h-screen">
      {children}
    </div>
  );
};
