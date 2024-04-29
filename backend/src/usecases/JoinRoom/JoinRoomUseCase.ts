import { GameRepository } from "../../repositories/GameRepository";
import { JoinRoomDto, JoinRoomResponseDto } from "./JoinRoomDto";

export class JoinRoomUseCase {
  private gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  execute(joinRoomDto: JoinRoomDto): JoinRoomResponseDto {
    const activeRoomByPlayer = this.gameRepository.findRoomByPlayerId(joinRoomDto.playerId);
    const player = this.gameRepository.findPlayerById(joinRoomDto.playerId);

    if (!player) {
      throw new Error("PLAYER_NOT_FOUND");
    }

    if (activeRoomByPlayer) {
      activeRoomByPlayer.removePlayer(player);
    }

    const room = this.gameRepository.findRoomById(joinRoomDto.roomId);
    if (!room) {
      throw new Error("ROOM_NOT_FOUND");
    }
    if (room?.players.length >= 2) {
      throw new Error("FULL_ROOM");
    }
    room?.players.push(player);
    return {
      player,
      room,
    }
  }
}