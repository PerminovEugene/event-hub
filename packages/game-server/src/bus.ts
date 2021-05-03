import { EventEmitter } from "events";
import { Socket } from "socket.io";
import { LobbyPublicData, PlayerPublicData } from "@event-hub/shared";

enum BusEvents {
  addNewPlayer = "AddNewPlayer",
  disconnectPlayer = "DisconnectPlayer",
  lobbyInfoUpdated = "LobbyInfoUpdated",

  broadcastToRoomPlayerJoined = "broadcastToRoomPlayerJoined",
  broadcastToRoomStartGame = "broadcastToRoomStartGame",
  broadcastToRoomStartGameAfterDelay = "broadcastToRoomStartGame",
}

export type RawPlayer = {
  socket: Socket;
  user: { id: number };
};

export class Bus {
  private ee = new EventEmitter();

  public addNewPlayer(rawPlayer: RawPlayer) {
    this.ee.emit(BusEvents.addNewPlayer, rawPlayer);
  }
  public subscribeOnNewPlayers(callback: (rawPlayer: RawPlayer) => void) {
    this.ee.on(BusEvents.addNewPlayer, callback);
  }

  public disconnectPlayer(userId: number) {
    if (this.ee) {
      this.ee.emit(BusEvents.disconnectPlayer, userId);
    }
  }
  public subscribeOnPlayerDisconnect(
    callback: (userId: number) => void
  ) {
    this.ee.on(BusEvents.disconnectPlayer, callback);
  }

  public broadcastToRoomPlayerJoined(
    roomId: string,
    playerPublicData: PlayerPublicData
  ) {
    this.ee.emit(BusEvents.broadcastToRoomPlayerJoined, {
      roomId,
      playerPublicData,
    });
  }
  public subscribeOnBroadcastToRoomPlayerJoined(
    callback: (data: {
      roomId: string;
      playerPublicData: PlayerPublicData;
    }) => void
  ) {
    this.ee.on(BusEvents.broadcastToRoomPlayerJoined, callback);
  }


  // public broadcastToRoomUpdateLobby(
  //   roomId: string,
  //   lobbyPublicData: PlayerPublicData
  // ) {
  //   this.ee.emit(BusEvents.broadcastToRoomPlayerJoined, {
  //     roomId,
  //     playerPublicData,
  //   });
  // }
  // public subscribeOnBroadcastToRoomUpdateLobby(
  //   callback: (data: {
  //     roomId: string;
  //     playerPublicData: PlayerPublicData;
  //   }) => void
  // ) {
  //   this.ee.on(BusEvents.broadcastToRoomPlayerJoined, callback);
  // }


  public broadcastToRoomStartGameAfterDelay(roomId: string) {
    this.ee.emit(BusEvents.broadcastToRoomStartGameAfterDelay, roomId);
  }
  public subscribeOnBroadcastToRoomStartGameAfterDelay(
    callback: (roomId: string) => void
  ) {
    this.ee.on(BusEvents.broadcastToRoomStartGameAfterDelay, callback);
  }


  public broadcastToRoomStartGame(roomId: string) {
    this.ee.emit(BusEvents.broadcastToRoomStartGame, roomId);
  }
  public subscribeOnBroadcastToRoomStartGame(
    callback: (roomId: string) => void
  ) {
    this.ee.on(BusEvents.broadcastToRoomStartGameAfterDelay, callback);
  }

  public updateLobbyInfo(
    callback: (roomId: string, lobbyInfo: LobbyPublicData) => void
  ) {
    this.ee.on(BusEvents.lobbyInfoUpdated, callback);
  }
  public subscribeOnLobbyInfoUpdated(
    callback: (data: {
      roomId: string,
      lobbyInfo: LobbyPublicData
    }) => void
  ) {
    this.ee.on(BusEvents.lobbyInfoUpdated, callback);
  }

  public destroy() {
    this.ee.removeAllListeners();
    this.ee = null;
  }
}
