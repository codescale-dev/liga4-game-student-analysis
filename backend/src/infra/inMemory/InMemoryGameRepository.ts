import { Player } from "../../entities/Player";
import { Room } from "../../entities/Room";
import { GameRepository } from "../../repositories/GameRepository";

export class InMemoryGameRepository implements GameRepository {
  private Rooms: Room[];
  private Players: Player[];

  constructor() {
    this.Rooms = [];
    this.Players = [];
  }

  get rooms() {
    return this.Rooms;
  }

  get players() {
    return this.Players;
  }

  addRoom(newRoom: Room) {
    this.Rooms.push(newRoom);
  }

  findRoomById(id: string) {
    return this.Rooms.find((room) => room.id === id);
  }

  findRoomByPlayerId(id: string) {
    return this.Rooms.find((room) => room.players.some(player => player.id === id));
  }

  removeRoom(room: Room) {
    const finalRooms = this.Rooms.filter((currentRoom) => currentRoom.id != room.id);
    this.Rooms = finalRooms;
  }

  findPlayerById(id: string) {
    return this.Players.find((player) => player.id === id);
  }

  addPlayer(player: Player) {
    this.Players.push(player);
  }

  removePlayer(player: Player) {
    const finalPlayers = this.players.filter((currentPlayer) => currentPlayer.id != player.id);
    this.Players = finalPlayers;
  }
}