import { PlayerPublicData } from "./player-model";

export enum ServerEventNames {
  // in lobby, room boradcast
  PlayerJoinedRoom = "UserJoinedRoom",
  PlayerLeftRoom = "UserLeftRoom",

  // in lobby, player emit
  LobbyInfoUpdated = "LobbyInfoUpdated",
  GameStartAfterDelay = "GameStartAfterDelay",
  GameIsStarted = "GameIsStarted",
}

export type SocketServerEvent = {
  [ServerEventNames.PlayerJoinedRoom]: PlayerPublicData;
};

export type LobbyPublicData = {
  players: PlayerPublicData[];
  size: number;
};

export type Call<D> = (data: D) => [ServerEventNames, D];
export type Handler<T extends Function> = (callback: T) => [ServerEventNames, T];

export const eventsMap = {
  lobbyInfoUpdated: {
    call: (lobby: LobbyPublicData): [ServerEventNames, LobbyPublicData] => [
      ServerEventNames.LobbyInfoUpdated,
      lobby,
    ],
    handler: (
      callback: (lobbyPublicData: LobbyPublicData) => void
    ): [ServerEventNames, (lobbyPublicData: LobbyPublicData) => void] => [
      ServerEventNames.LobbyInfoUpdated,
      callback,
    ],
  },
  gameWillBeStartedAfterDelay: {
    call: (): [ServerEventNames] => [ServerEventNames.GameStartAfterDelay],
    handler: (callback: () => void): [ServerEventNames, () => void] => [
      ServerEventNames.GameStartAfterDelay,
      callback,
    ],
  },
  startGame: {
    call: (): [ServerEventNames] => [ServerEventNames.GameStartAfterDelay],
    handler: (callback: () => void): [ServerEventNames, () => void] => [
      ServerEventNames.GameStartAfterDelay,
      callback,
    ],
  },
  playerJoinRoom: {
    call: (
      playerPublicData: PlayerPublicData
    ): [ServerEventNames, PlayerPublicData] => [
      ServerEventNames.PlayerJoinedRoom,
      playerPublicData,
    ],
    handler: (
      callback: (playerPublicData: PlayerPublicData) => void
    ): [ServerEventNames, (playerPublicData: PlayerPublicData) => void] => [
      ServerEventNames.PlayerJoinedRoom,
      callback,
    ],
  },
};

export type a = <T>(eventName: ServerEventNames, data: T) => {};
