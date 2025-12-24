import {
    SocketClientToServerTemplate,
    SocketServerToClientTemplate,
} from "./template.js";

export interface CdnClientToServerEvents
    //
    extends SocketClientToServerTemplate {}

export interface CdnServerToClientEvents
    //
    extends SocketServerToClientTemplate {}
