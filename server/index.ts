import "dotenv/config";
import cors from "cors";
import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import { errorHandler } from "./errorHandler";
import { socketHandler } from "./socketHandler";

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());

// Handle incoming connections
socketHandler(io);

// Handle errors
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
