import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    // JOIN ROOM
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    // Send update to specific user
    socket.on("sendupdate", ({ userId}) => {
      console.log(`Sending update to userId :${userId}`);
      socket.to(userId).emit("orderUpdate",);
    });

    // Send update to admin
    socket.on("orderSubmit", () => {
      console.log("Order Submeted");
      io.to("admin").emit("orderSubmited",);
    });


  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
