import { GameRepository } from "../../repositories/GameRepository";
import { AddPieceDto, AddPieceResponseDto } from "./AddPieceDto";

export class AddPieceUseCase {
  private gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  execute(AddPieceDto: AddPieceDto): AddPieceResponseDto {
    const activeRoomByPlayer = this.gameRepository.findRoomByPlayerId(AddPieceDto.playerId);
    if (!activeRoomByPlayer) {
      throw new Error("ROOM_NOT_FOUND");
    }

    if (!activeRoomByPlayer.inProgress) {
      throw new Error("GAME_FINISHED");
    }

    const player = this.gameRepository.findPlayerById(AddPieceDto.playerId);
    if (!player) {
      throw new Error("PLAYER_NOT_FOUND");
    }

    activeRoomByPlayer?.addPiece(player, AddPieceDto.row);

    const winner = activeRoomByPlayer.checkWinner();

    if (winner) {
      activeRoomByPlayer.finishGame();
    }

    return {
      room: activeRoomByPlayer,
      winner,
    }
  }
}