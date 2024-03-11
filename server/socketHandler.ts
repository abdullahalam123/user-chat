import { Socket, Server as SocketIoServer } from "socket.io";

const connectedUsers = new Map<string, { username: string; color: string }>();
const colors = ["#e67e22", "#2ecc71", "#3498db", "#9b59b6", "#f1c40f"];

export const socketHandler = (io: SocketIoServer) => {
  io.on("connection", (socket: Socket) => {
    console.log("A user connected");

    const username = `User${Math.floor(Math.random() * 1000)}`;
    const color = colors[Math.floor(Math.random() * colors.length)];
    connectedUsers.set(socket.id, { username, color });

    socket.broadcast.emit("user-connected", {
      userId: socket.id,
      username,
      color,
    });

    socket.on("send-message", (message: string) => {
      if (typeof message === "string" && message.trim().length > 0) {
        const { username, color } = connectedUsers.get(socket.id) || {
          username: "Unknown",
          color: "#000000",
        };
        io.emit("receive-message", { message, username, color });
      } else {
        console.error("Invalid message received:", message);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
      connectedUsers.delete(socket.id);
      socket.broadcast.emit("user-disconnected", socket.id);
    });

    socket.on("error", (error: Error) => {
      console.error("Socket error:", error);
    });
  });
};
