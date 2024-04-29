import { Player } from "../entities/Player";
import { Room } from "../entities/Room";

export interface GameRepository {
  rooms: Room[];
  addRoom(newRoom: Room): void;
  findRoomById(roomId: string): Room | undefined;
  findRoomByPlayerId(playerId: string): Room | undefined;
  removeRoom(room: Room): void;
  findPlayerById(playerId: string): Player | undefined;
  addPlayer(player: Player): void;
  removePlayer(player: Player): void;
}
