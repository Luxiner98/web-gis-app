import { useMapContext } from "@/context/mapContext";

export const ButtonToggleWMS = () => {
  const { toggleWMSLayer } = useMapContext();

  return (
    <button
      onClick={toggleWMSLayer}
      className="absolute z-10 right-0 mr-2 mt-2 p-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold border border-blue-700 rounded"
    >
      Toggle WMS
    </button>
  );
};
