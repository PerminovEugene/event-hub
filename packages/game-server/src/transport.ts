import io, { Socket } from "socket.io";
import { Server } from "http";
import { Bus, ExtendedSocket } from "./bus";
import { PlayerPublicData, eventsMap, LobbyPublicData } from "@event-hub/shared";
import { parseJWT } from "./auth";

enum SocketEvent {
  connection = "connection",
  message = "message",
  disconnecting = "disconnecting",
  disconnect = "disconnect",
}

export class ServerTransport {
  constructor(private bus: Bus) {}

  private socket: io.Server;
  private clients: Socket[] = [];

  public init(server: Server) {
    this.socket = io(server);

    this.socket.use(async (socket, next) => {
      const handshake = socket.handshake;
      const { token } = handshake.query;
      const { userId } = parseJWT(token);
      if (!userId) {
        return next('fail user');
      }
      socket.request.user = { id: userId };
      next();
    });
 
    this.socket.on(SocketEvent.connection, (socket: ExtendedSocket) => {
      const user = socket.request.user;
      
      socket.on(SocketEvent.disconnecting, () => {
        this.bus.disconnectPlayer(socket.lobbyId, user.id);
        this.clients = this.clients.filter(({id}) => id !== socket.id);
      });
      // socket.on(SocketEvent.disconnect, () => {
        // rooms are empty here
      // });

      socket.on(SocketEvent.message, (eventName: string, data: any) => {
        console.log(eventName, data);
      });

      socket.once('ready', () => {
        this.clients.push(socket);
        this.bus.addNewPlayer({
          socket,
          user,
        });
      })
      
    });
  }
  public destory() {
    this.clients.forEach(function(socket) {
      socket.removeAllListeners();
    });
    this.socket.removeAllListeners();
    this.socket.close();
  }

  public attachHandlers() {
    this.bus.subscribeOnBroadcastToRoomPlayerJoined(
      this.broadcastOnRoomPlayerJoinTheRoom
    );
    this.bus.subscribeOnBroadcastToRoomStartGameAfterDelay(
      this.broadcastToRoomStartGameAfterDelay
    );
    this.bus.subscribeOnBroadcastToRoomStartGame(
      this.broadcastToRoomStartGame
    );
    this.bus.subscribeOnLobbyInfoUpdated(
      this.updatePlayersLobbyInfo
    )
  }

// Player join and disconnect 

  public broadcastOnRoomPlayerJoinTheRoom = ({
    roomId,
    playerPublicData,
  }: {
    roomId: string;
    playerPublicData: PlayerPublicData;
  }) => {
    this.socket
      .to(roomId)
      .emit(...eventsMap.playerJoinRoom.call(playerPublicData));
  }

  public updatePlayersLobbyInfo = ({
    roomId,
    lobbyInfo,
  }: {
    roomId: string;
    lobbyInfo: LobbyPublicData;
  }) => {
    this.socket
      .to(roomId)
      .emit(...eventsMap.lobbyInfoUpdated.call(lobbyInfo));
  }

// Start game

  public broadcastToRoomStartGameAfterDelay = (roomId: string) => {
    this.socket
      .to(roomId)
      .emit(...eventsMap.gameWillBeStartedAfterDelay.call());
  }

  public broadcastToRoomStartGame = (roomId: string) => {
    this.socket.to(roomId).emit(...eventsMap.startGame.call());
  }
}
