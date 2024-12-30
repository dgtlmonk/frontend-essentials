# Server-Sent Events (SSE)

## What is SSE?

Server-Sent Events (SSE) is a web technology that enables servers to push real-time updates to clients over a single HTTP connection. It provides a standardized way for servers to initiate data transmission to clients once a client has established a connection.

## Key Features

- **One-Way Communication**: Server to client only
- **Auto-Reconnection**: Built-in automatic reconnection if connection is lost
- **Native Browser Support**: Works with standard EventSource API
- **Simple Protocol**: Uses standard HTTP
- **Event Types**: Supports named events and custom event types

## Comparison with Other Real-Time Technologies

### SSE vs WebSocket

| Feature         | SSE                              | WebSocket                             |
| --------------- | -------------------------------- | ------------------------------------- |
| Communication   | One-way (server to client)       | Two-way (full-duplex)                 |
| Protocol        | HTTP                             | WS/WSS                                |
| Reconnection    | Automatic                        | Manual implementation needed          |
| Max Connections | Limited by browser               | Higher limit                          |
| Header Size     | Regular HTTP headers             | Minimal overhead                      |
| Use Case        | Real-time updates, notifications | Interactive applications, chat, games |

### SSE vs Long Polling

| Feature         | SSE             | Long Polling      |
| --------------- | --------------- | ----------------- |
| Connection      | Persistent      | Repeated requests |
| Server Load     | Lower           | Higher            |
| Latency         | Lower           | Higher            |
| Implementation  | Simple          | More complex      |
| Browser Support | Modern browsers | Universal         |

## Ideal Use Cases

Real-time notifications
Live feed updates
Status updates
Stock tickers
Social media feeds
Log file updates

## When to Use SSE

- When you need real-time updates from server to client
- When low latency is important
- When you don't need two-way communication
- When you want to avoid the complexity of WebSocket
- When automatic reconnection is important

## When Not to Use SSE

- When you need bi-directional communication
- When you need to support older browsers
- When you need to send large amounts of data
- When you need more than 6 concurrent connections per browser

## Basic Implementation Example

```javascript
// Client-side
const eventSource = new EventSource("/events");

eventSource.onmessage = (event) => {
  console.log("Received:", event.data);
};

eventSource.onerror = (error) => {
  console.error("EventSource failed:", error);
};

// Server-side (Node.js/Express)
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send data to client
  const sendEvent = () => {
    res.write(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
  };

  const intervalId = setInterval(sendEvent, 1000);

  // Clean up on client disconnect
  req.on("close", () => {
    clearInterval(intervalId);
  });
});
```

## Browser Support

SSE is supported in all modern browsers including:

- Chrome
- Firefox
- Safari
- Edge
- Opera

## Resources

- [MDN Web Docs - Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [HTML Living Standard - SSE](https://html.spec.whatwg.org/multipage/server-sent-events.html)
- [Can I Use - SSE](https://caniuse.com/?search=server-sent%20events)
