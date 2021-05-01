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

  public init(server: Server) {
    this.socket = io(server);

    this.socket.on(SocketEvent.connection, (socket: Socket) => {
      const user = { id: 1 };
      this.bus.addNewPlayer({
        socket,
        user,
      });
      socket.on(SocketEvent.message, (eventName: string, data: any) => {
        console.log(eventName, data);
      });
      socket.on(SocketEvent.disconnect, () => {
        this.bus.disconnectPlayer(user.id)
      });
      socket.emit("hello");
    });
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
