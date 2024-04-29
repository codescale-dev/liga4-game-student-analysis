import { Room } from "../../entities/Room";
import { GameRepository } from "../../repositories/GameRepository";
import { CreateRoomDto } from "./CreateRoomDto";

export class CreateRoomUseCase {
  private gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  execute(createRoomDto: CreateRoomDto): Room {
    const player = this.gameRepository.findPlayerById(createRoomDto.id);
    if (!player) {
      throw new Error("PLAYER_NOT_FOUND");
    }
    const room = new Room(player);
    this.gameRepository.addRoom(room);
    return room;
  }
}