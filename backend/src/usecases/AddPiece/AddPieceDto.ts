import { Player } from "../../entities/Player";
import { Room } from "../../entities/Room";

export interface AddPieceDto {
  playerId: string;
  row: number;
}

export interface AddPieceResponseDto {
  room: Room;
  winner: Player | undefined;
}