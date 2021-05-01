import { Socket } from "socket.io";
import { RawPlayer } from "./bus";
import {
  PlayerPublicData,
  eventsMap,
  LobbyPublicData,
} from "@event-hub/shared";

type User = {
  id: number;
};

export class Player {
  private socket: Socket;
  private user: User;

  constructor(rawPlayer: RawPlayer) {
    this.socket = rawPlayer.socket;
    this.user = rawPlayer.user;
  }

  public joinRoom(roomName: string) {
    this.socket.join(roomName);
  }

  // User info available for every other user
  public getPublicPlayerData(): PlayerPublicData {
    return this.user;
  }

  // User info available to user (her/him)self
  public getPersonalUser() {
    return this.user;
  }
  // TODO make lerna script for fast update shared package
  public sendLobbyInfo(lobbyPublicData: LobbyPublicData) {
    this.socket.emit(...eventsMap.lobbyInfoUpdated.call(lobbyPublicData));
  }
}
