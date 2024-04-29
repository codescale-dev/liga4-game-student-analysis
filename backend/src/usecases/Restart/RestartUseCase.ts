import { GameRepository } from "../../repositories/GameRepository";
import { RestartDto, RestartResponseDto } from "./RestartDto";

export class RestartUseCase {
  private gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  execute(restartDto: RestartDto): RestartResponseDto {
    const activeRoomByPlayer = this.gameRepository.findRoomByPlayerId(restartDto.playerId);

    if (!activeRoomByPlayer) {
      throw new Error("ROOM_NOT_FOUND");
    }

    activeRoomByPlayer.restartGame();

    return {
      room: activeRoomByPlayer
    }
  }
}