import type { Socket as ClientSocket } from "socket.io-client";
import type { Socket as ServerSocket } from "socket.io";
import {
    CdnClientToServerEvents as ClientToServer,
    CdnServerToClientEvents as ServerToClient,
} from "./interface/index.js";

export type CdnClientSocket = ClientSocket<ServerToClient, ClientToServer>;

export type CdnServerSocket = ServerSocket<ClientToServer, ServerToClient>;
