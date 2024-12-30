import { useEffect, useState } from "react";

const Stock = () => {
  const [streamData, setStreamData] = useState({
    time: null,
  });

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4001/stream");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStreamData({ ...streamData, ...data });
    };
    // clean up
    return () => eventSource.close();
  }, []);

  return (
    <div>
      {streamData.time ? (
        <p>Server Streamed Time Data: {streamData.time}</p>
      ) : null}
    </div>
  );
};

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        margin: "auto",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stock />
    </div>
  );
}
