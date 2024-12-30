import express from "express";

const app = express();

app.get("/stream", (_req, res, _next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    Connection: "keep-alive", // allowing TCP connection to remain open for multiple HTTP requests/responses
    "Content-Type": "text/event-stream", // media type for Server Sent Events (SSE)
  });
  res.flushHeaders();
  // Send data to client
  const sendEvent = () => {
    res.write(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
  };

  const intervalId = setInterval(sendEvent, 1000);

  // Clean up on client disconnect
  res.on("close", () => {
    clearInterval(intervalId);
  });
});

app.listen(4001, "localhost", () => {
  console.log("Server is up and running at port 4001");
});
