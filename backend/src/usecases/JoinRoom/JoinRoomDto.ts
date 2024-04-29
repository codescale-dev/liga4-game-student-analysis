import { Player } from "../../entities/Player";
import { Room } from "../../entities/Room";

export interface JoinRoomDto {
  roomId: string;
  playerId: string;
}

export interface JoinRoomResponseDto {
  player: Player;
  room: Room;
}