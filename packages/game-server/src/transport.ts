import io, { Socket } from "socket.io";
import { Server } from "http";
import { Bus } from "./bus";
import { PlayerPublicData, eventsMap, LobbyPublicData } from "@event-hub/shared";

enum SocketEvent {
  connection = "connection",
  message = "message",
  disconnect = "disconnect",
}

export class ServerTransport {
  constructor(private bus: Bus) {}

  private socket: io.Server;
  private clients: Socket[] = [];


  private id = 0; // temp
  public init(server: Server) {
    this.socket = io(server);

    this.socket.on(SocketEvent.connection, (socket: Socket) => {
      this.id += 1;
      const user = { id: this.id }; // TODO temp, imitate getting user id from handshake
      this.clients.push(socket);
      this.bus.addNewPlayer({
        socket,
        user,
      });
      socket.on(SocketEvent.message, (eventName: string, data: any) => {
        console.log(eventName, data);
      });
      socket.on(SocketEvent.disconnect, () => {
        this.bus.disconnectPlayer(user.id)
        this.clients = this.clients.filter(({id}) => id !== socket.id)
      });
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
