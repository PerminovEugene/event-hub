import { Socket } from "socket.io";
import { RawPlayer } from "./bus";
import {
  PlayerPublicData,
  eventsMap,
  LobbyPublicData,
} from "@event-hub/shared";
import { LobbyId } from "./lobby";

type User = {
  id: number;
};
type SessionData = {
  lobbyId: LobbyId
}

export class Player {
  private socket: Socket;
  private user: User;
  private sessionData: SessionData;

  constructor(rawPlayer: RawPlayer, lobbyId: LobbyId) {
    this.socket = rawPlayer.socket;
    this.user = rawPlayer.user;
    this.sessionData = { lobbyId };
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
