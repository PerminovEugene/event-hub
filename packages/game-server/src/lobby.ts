import { Bus } from "./bus";
import { Player } from "./player";
import { v4 as uuidv4 } from 'uuid';

const FIVE_SECONDS = 5_000;

export type LobbyConfig = {
  size: number;
  delayBeforeStartingGame: number;
};
export type LobbyId = string;

export class Lobby {
  private players: Player[] = [];
  private _id: LobbyId;
  private gameStartingTimer: NodeJS.Timeout;

  constructor(
    private bus: Bus,
    private lobbyConfig: LobbyConfig = {
      size: 2,
      delayBeforeStartingGame: FIVE_SECONDS,
    }
  ) {
    this._id = uuidv4();
  }

  get id() {
    return this._id;
  }

  public joinPlayer(player: Player) {
    if (!this.isFull()) {
      if (this.players.length) {
        this.bus.broadcastToRoomPlayerJoined(
          this.id,
          player.getPublicPlayerData()
        );
      }
      this.players.push(player);
      player.joinRoom(this.id);
      player.sendLobbyInfo({
        players: this.players.map((player) => player.getPublicPlayerData()),
        size: this.lobbyConfig.size,
      });
    } else {
      throw new Error("Lobby is full");
    }
  }

  public kickPlayer = (userId: number) => {
    this.players = this.players.filter((player) => player.getPublicPlayerData().id !== userId);
    // TODO this.bus.send
    clearTimeout(this.gameStartingTimer);
  }

  public isFull = () => {
    return this.players.length >= this.lobbyConfig.size;
  }

  public startGameAfterDelay() {
    this.bus.broadcastToRoomStartGameAfterDelay(this.id);
    // TODO if someone left lobby need to clean timer
    this.gameStartingTimer = setTimeout(() => {
      this.bus.broadcastToRoomStartGame(this.id);
    }, this.lobbyConfig.delayBeforeStartingGame);
  }
}
