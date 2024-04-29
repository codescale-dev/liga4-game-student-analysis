import { Room } from "../../entities/Room";

export interface DisconnectDto {
  playerId: string;
}

export interface DisconnectResponseDto {
  room: Room | undefined;
}