import { GameRepository } from "../../repositories/GameRepository";
import { GetTableDto, GetTableResponseDto } from "./GetTableDto";

export class GetTableUseCase {
  private gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  execute(getTableDto: GetTableDto): GetTableResponseDto {
    const activeRoomByPlayer = this.gameRepository.findRoomByPlayerId(getTableDto.playerId);

    if (!activeRoomByPlayer) {
      throw new Error("ROOM_NOT_FOUND");
    }

    return {
      table: activeRoomByPlayer.table
    }
  }
}