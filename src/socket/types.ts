import type { Socket as ClientSocket } from "socket.io-client";
import {
    CdnClientToServerEvents as ClientToServer,
    CdnServerToClientEvents as ServerToClient,
} from "./interface/index.js";

export type CdnClientSocket = ClientSocket<ServerToClient, ClientToServer>;
