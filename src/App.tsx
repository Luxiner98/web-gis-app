import { OpenLayersMap } from "./components/OpenLayersMap";
import { Tooltip } from "./components/Tooltip";
import { MapContextProvider } from "./context";

function App() {
  return (
    <MapContextProvider>
      <OpenLayersMap />
      <Tooltip />
    </MapContextProvider>
  );
}

export default App;
