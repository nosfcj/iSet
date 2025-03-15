// src/config/websocket.config.ts
import { Server as SocketServer } from "socket.io";
import { Server as HttpServer } from "http";

export const WS_EVENTS = {
  CONNECT: 'connection',
  DISCONNECT: 'disconnect',
  ERROR: 'error'
};

export const WS_NAMESPACES = {
  TRIAGEM: '/triagem',
  ATENDIMENTO: '/atendimento',
  SUPERVISOR: '/supervisor',
  MONITOR: '/monitor'
};

export function createWebSocketServer(httpServer: HttpServer) {
  return new SocketServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST"]
    },
    path: '/ws'  // Caminho base para conexões WebSocket
  });
}