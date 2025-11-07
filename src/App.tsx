import { OpenLayersMap } from "./components/OpenLayersMap";
import { MapContextProvider } from "./context";

function App() {
  return (
    <MapContextProvider>
      <OpenLayersMap />
    </MapContextProvider>
  );
}

export default App;
