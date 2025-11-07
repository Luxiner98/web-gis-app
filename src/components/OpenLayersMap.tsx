import { useMapContext } from "@/context/mapContext";
import "ol/ol.css";

export const OpenLayersMap = () => {
  const { mapElementRef } = useMapContext();
  return <div ref={mapElementRef} className="w-screen h-screen relative" />;
};
