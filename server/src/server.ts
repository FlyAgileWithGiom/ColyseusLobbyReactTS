import { Server } from "colyseus";

const server = new Server({
  server: process.env.SERVER || "localhost",
  port: process.env.PORT || 2567,
});

server.onShutdown(() => {
  console.log("Server is shutting down!");
});

server.listen();
