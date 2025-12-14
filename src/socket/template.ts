export interface SocketClientToServerTemplate {
    ping: (message: string, callback: (message: string) => void) => void;
}

export interface SocketServerToClientTemplate {
    pong: (message: string) => void;
}
