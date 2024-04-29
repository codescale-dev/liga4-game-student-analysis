import { Room } from "../../entities/Room";

export interface RemovePlayerDto {
  playerId: string;
}

export interface RemovePlayerResponseDto {
  room: Room | undefined;
}