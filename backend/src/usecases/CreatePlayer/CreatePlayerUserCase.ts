import { Player } from "../../entities/Player";
import { GameRepository } from "../../repositories/GameRepository";
import { CreatePlayerDto } from "./CreatePlayerDto";

export class CreatePlayerUseCase {
  private gameRepository: GameRepository;

  constructor(gameRepository: GameRepository) {
    this.gameRepository = gameRepository;
  }

  execute(createPlayerDto: CreatePlayerDto): void {
    const { name, id } = createPlayerDto;
    const player = new Player(name, id);
    this.gameRepository.addPlayer(player);
  }
}