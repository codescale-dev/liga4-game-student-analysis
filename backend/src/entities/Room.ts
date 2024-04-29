import { Player } from "./Player";

const NUMBER_ROWS = 7;
const NUMBER_COLUMNS = 6;

export class Room {
  private Id: string;
  private Players: Player[];
  private Table: Player[][];
  private LastPlayerAdd: Player | null;
  private InProgress: boolean;

  constructor(creatorPlayer: Player) {
    this.Id = crypto.randomUUID();
    this.Players = [creatorPlayer];
    this.Table = Array(NUMBER_ROWS).fill(null).map(() => Array(NUMBER_COLUMNS).fill(null));
    this.LastPlayerAdd = null;
    this.InProgress = true;
  }

  get id() {
    return this.Id;
  }

  get inProgress() {
    return this.InProgress;
  }


  get players() {
    return this.Players;
  }

  get table() {
    return this.Table;
  }

  private checkColumnIsFull(row: number) {
    if (row > NUMBER_ROWS || row < 0) {
      throw new Error("COLUMN_NOT_EXIST");
    }
    if (this.Table[row][NUMBER_COLUMNS - 1]) {
      return true;
    }
    return false;
  }

  addPiece(player: Player, row: number) {
    if (player.id === this.LastPlayerAdd?.id) {
      throw new Error("INVALID_PLAYER_TURN");
    }
    if (this.checkColumnIsFull(row)) {
      throw new Error("COLUMN_IS_FULL");
    }
    let lastPieceIndex = 0;
    for (let columnIndex = 0; columnIndex < this.Table[row].length; columnIndex++) {
      const column = this.Table[row][columnIndex];
      if (!column) {
        lastPieceIndex = columnIndex;
        break;
      }
    }
    this.Table[row][lastPieceIndex] = player;
    this.LastPlayerAdd = player;
  }

  checkWinner() {
    const rows = this.Table.length;
    const cols = this.Table[0].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j <= cols - 4; j++) {
        if (this.Table[i][j] === null) {
          continue;
        }
        if (this.Table[i][j].id === this.Table[i][j + 1]?.id &&
          this.Table[i][j].id === this.Table[i][j + 2]?.id &&
          this.Table[i][j].id === this.Table[i][j + 3]?.id) {
          return this.Table[i][j];
        }
      }
    }
    for (let i = 0; i <= rows - 4; i++) {
      for (let j = 0; j < cols; j++) {
        if (this.Table[i][j] === null) {
          continue;
        }
        if (this.Table[i][j].id === this.Table[i + 1][j]?.id &&
          this.Table[i][j].id === this.Table[i + 2][j]?.id &&
          this.Table[i][j].id === this.Table[i + 3][j]?.id) {
          return this.Table[i][j];
        }
      }
    }

    for (let i = 0; i <= rows - 4; i++) {
      for (let j = 0; j <= cols - 4; j++) {
        if (this.Table[i][j] === null) {
          continue;
        }
        if (this.Table[i][j].id === this.Table[i + 1][j + 1]?.id &&
          this.Table[i][j].id === this.Table[i + 2][j + 2]?.id &&
          this.Table[i][j].id === this.Table[i + 3][j + 3]?.id) {
          return this.Table[i][j];
        }
      }
    }

    for (let i = 3; i < rows; i++) {
      for (let j = 0; j <= cols - 4; j++) {
        if (this.Table[i][j] === null) {
          continue;
        }
        if (this.Table[i][j].id === this.Table[i - 1][j + 1]?.id &&
          this.Table[i][j].id === this.Table[i - 2][j + 2]?.id &&
          this.Table[i][j].id === this.Table[i - 3][j + 3]?.id) {
          return this.Table[i][j];
        }
      }
    }
  }

  finishGame() {
    this.InProgress = false;
  }

  restartGame() {
    this.Table = Array(NUMBER_ROWS).fill(null).map(() => Array(NUMBER_COLUMNS).fill(null));
    this.LastPlayerAdd = null;
    this.InProgress = true;
  }


  findPlayerById(id: string) {
    return this.Players.find((player) => player.id === id);
  }

  addPlayer(player: Player) {
    this.Players.push(player);
  }

  removePlayer(player: Player) {
    const finalPlayers = this.players.filter((currentPlayer) => currentPlayer.id != player.id);
    this.Players = finalPlayers;
  }
}