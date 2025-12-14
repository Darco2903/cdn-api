import {
    SocketClientToServerTemplate,
    SocketServerToClientTemplate,
} from "./template.js";

export interface ClientToServerEvents
    //
    extends SocketClientToServerTemplate {}

export interface ServerToClientEvents
    //
    extends SocketServerToClientTemplate {}
