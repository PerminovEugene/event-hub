import { Transport } from "@event-hub/game-shared/src/transport/transport";
import io from "socket.io";

enum SocketEvent {
  connection = "connection",
  message = "message",
  disconnect = "disconnect",
}

export class ServerSocketTransport extends Transport {
  private _sockets;

  public init(server: Http) {
    this._sockets = io(server);

    this._sockets.on(SocketEvent.connection, (client) => {
      //   client.on("connect", () => {
      //     console.log("connected");
      //   });
      client.on(SocketEvent.message, (eventName: string, data: any) => {
        if (eventName === "userEvents") {
          flow.merge(data);
        }
      });
      client.on(SocketEvent.disconnect, () => {
        console.log("disconnected");
      });
    });
  }

  public updateClients(data: unknown ) {
    this._sockets.broadcast('SocketServerEvent');
  }
}
