import { Player } from "../../entities/Player";

export interface GetTableDto {
  playerId: string;
}

export interface GetTableResponseDto {
  table: Player[][];
}