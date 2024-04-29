import { GameRepository } from "../../repositories/GameRepository";
import { RemovePlayerDto, RemovePlayerResponseDto } from "./RemovePlayerDto";

export class RemovePlayerUseCase {
  private gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  execute(removePlayerDto: RemovePlayerDto): RemovePlayerResponseDto {
    let room;
    for (let indexRoom = 0; indexRoom < this.gameRepository.rooms.length; indexRoom++) {
      room = this.gameRepository.rooms[indexRoom];
      const player = room?.findPlayerById(removePlayerDto.playerId);
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