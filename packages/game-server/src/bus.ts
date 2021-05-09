import { EventEmitter } from "events";
import { Socket } from "socket.io";
import { LobbyPublicData, PlayerPublicData } from "@event-hub/shared";

enum BusEvents {
  addNewPlayer = "AddNewPlayer",
  disconnectPlayer = "DisconnectPlayer",
  lobbyInfoUpdated = "LobbyInfoUpdated",

  broadcastToRoomPlayerJoined = "broadcastToRoomPlayerJoined",
  broadcastToRoomStartGame = "broadcastToRoomStartGame",
  broadcastToRoomStartGameAfterDelay = "broadcastToRoomStartGameAfterDelay",
}

export type ExtendedSocket = Socket & {
  lobbyId?: string;
}

export type RawPlayer = {
  socket: ExtendedSocket;
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

  public disconnectPlayer(lobbyId: string, userId: number) {
    if (this.ee) {
      this.ee.emit(BusEvents.disconnectPlayer, { lobbyId, userId });
    }
  }
  public subscribeOnPlayerDisconnect(
    callback: ({ userId: number, lobbyId: string }) => void
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


  public broadcastToRoomStartGameAfterDelay(
    roomId: string,
    launchOptions: { delayBeforeStartGame: number }
  ) {
    this.ee.emit(BusEvents.broadcastToRoomStartGameAfterDelay, roomId, launchOptions);
  }
  public subscribeOnBroadcastToRoomStartGameAfterDelay(
    callback: (roomId: string, launchOptions: { delayBeforeStartGame: number }) => void
  ) {
    this.ee.on(BusEvents.broadcastToRoomStartGameAfterDelay, callback);
  }


  public broadcastToRoomStartGame(roomId: string) {
    this.ee.emit(BusEvents.broadcastToRoomStartGame, roomId);
  }
  public subscribeOnBroadcastToRoomStartGame(
    callback: (roomId: string) => void
  ) {
    this.ee.on(BusEvents.broadcastToRoomStartGame, callback);
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
