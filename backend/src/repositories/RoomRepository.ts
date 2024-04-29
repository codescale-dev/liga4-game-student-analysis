import { Player } from "../entities/Player";

export interface RoomRepository {
  addPlayer(player: Player): void;
  removePlayer(player: Player): void;
  findPlayerById(playerId: number): Player | undefined;
  checkColumnIsFull(row: number): boolean;
  addPiece(player: Player, row: number): void;
  checkWinner(): Player | undefined;
  finishGame(): void;
  restartGame(): void;
}
