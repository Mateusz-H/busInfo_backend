import { Server } from "socket.io";
import { stopsService } from "../app.js";

export class SocketIoServer {
  socketIo;
  numberOfConnectedUsers = 0;
  activeChannels = [];
  activeChannelsForUsers = {};
  constructor(serverInstance, baseUrl) {
    this.socketIo = new Server(serverInstance, {
      cors: {
        origin: baseUrl,
        methods: ["websocket"],
      },
      path: "/api",
    });
    this.initializeDataEvents();
  }
  initializeDataEvents() {
    this.socketIo.on("connection", (socket) => {
      this.onConnectionRequest(socket);
      socket.on("disconnect", () => this.onDisconnectRequest(socket));
      socket.on("getStops", () => this.onStopsRequest(socket));
      socket.on("joinToStopChannel", (name) =>
        this.onJoinToStopChannelRequest(socket, name)
      );
      socket.on("leaveStopChannel", (name) =>
        this.onLeaveStopChannelRequest(socket, name)
      );
    });
  }
  onConnectionRequest(socket) {
    this.numberOfConnectedUsers += 1;
  }
  onStopsRequest(socket) {
    socket.emit("stopsReceive", stopsService.stopsWithIds);
  }
  onJoinToStopChannelRequest(socket, stopName) {
    socket.join(stopName);
    this.addStopToActiveChannels(stopName);

    if (this.activeChannelsForUsers.hasOwnProperty(socket.id)) {
      if (this.activeChannelsForUsers[socket.id].indexOf(stopName) === -1)
        this.activeChannelsForUsers[socket.id].push(stopName);
    } else {
      this.activeChannelsForUsers[socket.id] = [stopName];
    }
  }
  onLeaveStopChannelRequest(socket, stopName) {
    socket.leave(stopName);
    this.sliceStopFromActiveChannels(socket, stopName);
    if (this.activeChannelsForUsers.hasOwnProperty(socket.id)) {
      const index = this.activeChannelsForUsers[socket.id].indexOf(stopName);
      if (index > -1) this.activeChannelsForUsers[socket.id].slice(index, 1);
    }
  }
  onDisconnectRequest(socket) {
    if (this.activeChannelsForUsers.hasOwnProperty(socket.id)) {
      this.activeChannelsForUsers[socket.id].forEach((stopName) => {
        this.sliceStopFromActiveChannels(socket, stopName);
      });
    }
  }
  addStopToActiveChannels(stopName) {
    if (this.activeChannels.indexOf(stopName) === -1) {
      this.activeChannels.push(stopName);
    }
  }
  sliceStopFromActiveChannels(socket, stopName) {
    if (!socket.adapter.rooms.has(stopName)) {
      const index = this.activeChannels.indexOf(stopName);
      if (index > -1) this.activeChannels.splice(index, 1);
    }
  }
}
