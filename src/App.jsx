import { useEffect, useState } from "react";
import KenyaMap from "./components/KenyaMap";
import { fetchBlooms } from "./services/api";

function App() {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState(null); // data from Python API

  useEffect(() => {
    fetchBlooms().then(setData);
  }, []);

  // Placeholder: simulate fetching from Python API
  const handlePredict = async () => {
    const res = await fetch("http://localhost:5000/api/predict"); // Node → Python call
    const result = await res.json();
    setInfo(result);
  };

  return (
    <div className="h-screen flex">
      {/* LEFT PANEL */}
      <div className="w-2/3 p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-4">🌍 Bloom Watchers - Kenya</h1>
        <KenyaMap data={data} />
        <div className="mt-4 flex gap-2">
          <button className="btn btn-primary">Filter</button>
          <button className="btn btn-secondary" onClick={handlePredict}>
            Predict
          </button>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-1/3 p-4 bg-base-200 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Bloom Insights</h2>

        {/* If info from Python API is available */}
        {info ? (
          <div className="space-y-4">
            {info.map((entry, i) => (
              <div key={i} className="card bg-base-100 shadow-md p-4">
                <p><b>Date:</b> {entry.ds}</p>
                <p><b>Predicted NDVI:</b> {entry.yhat.toFixed(3)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            Select <b>Predict</b> to see forecasted bloom data or use filters to fetch reports.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
