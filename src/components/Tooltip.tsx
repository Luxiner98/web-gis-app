import { useMapContext } from "@/context/mapContext";

export const Tooltip = () => {
  const { popupRef, tooltipData } = useMapContext();

  return (
    <div
      ref={popupRef}
      className="absolute min-w-[180px] max-w-[260px] bg-white border border-gray-300 rounded-lg shadow-lg p-3 text-sm leading-tight"
      style={{ pointerEvents: "none" }}
    >
      {tooltipData && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-1">Cadastral Parcel</h3>
          <div className="text-gray-700">
            <p>
              <span className="font-medium">Area:</span> {tooltipData.properties?.area || "N/A"}
            </p>
            <p>
              <span className="font-medium">Parcel number:</span>{" "}
              {tooltipData.properties.parcel_number || "N/A"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
