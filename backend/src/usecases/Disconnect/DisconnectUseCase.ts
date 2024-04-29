import { GameRepository } from "../../repositories/GameRepository";
import { DisconnectDto, DisconnectResponseDto } from "./DisconnectDto";

export class DisconnectUseCase {
  private gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  execute(disconnectDto: DisconnectDto): DisconnectResponseDto {
    let room;
    for (let indexRoom = 0; indexRoom < this.gameRepository.rooms.length; indexRoom++) {
      room = this.gameRepository.rooms[indexRoom];
      const player = room?.findPlayerById(disconnectDto.playerId);
      if (player) {
        room.removePlayer(player);
        this.gameRepository.removePlayer(player);
        if (!room.players.length) {
          this.gameRepository.removeRoom(room);
        }
      }
    }

    return {
      room
    }
  }
}