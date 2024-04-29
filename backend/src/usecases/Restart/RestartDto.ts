import { Room } from "../../entities/Room";

export interface RestartDto {
  playerId: string;
}

export interface RestartResponseDto {
  room: Room;
}