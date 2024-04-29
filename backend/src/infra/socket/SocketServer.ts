import http from 'http';
import { Server, Socket } from 'socket.io';
import { InMemoryGameRepository } from '../inMemory/InMemoryGameRepository';
import { CreatePlayerUseCase } from '../../usecases/CreatePlayer/CreatePlayerUserCase';
import { CreateRoomUseCase } from '../../usecases/CreateRoom/CreateRoomUseCase';
import { JoinRoomUseCase } from '../../usecases/JoinRoom/JoinRoomUseCase';
import { GetTableUseCase } from '../../usecases/GetTable/GetTableUseCase';
import { AddPieceUseCase } from '../../usecases/AddPiece/AddPieceUseCase';
import { RestartUseCase } from '../../usecases/Restart/RestartUseCase';
import { DisconnectUseCase } from '../../usecases/Disconnect/DisconnectUseCase';
import { RemovePlayerUseCase } from '../../usecases/RemovePlayer/RemovePlayerUseCase';

export class SocketServer {
  private io: Server

  constructor(server: http.Server) {
    this.io = new Server(server, { cors: { origin: '*' } });
  }

  start() {
    const game = new InMemoryGameRepository();
    const createPlayerUseCase = new CreatePlayerUseCase(game);
    const removePlayerUseCase = new RemovePlayerUseCase(game);
    const createRoomUseCase = new CreateRoomUseCase(game);
    const joinRoomUseCase = new JoinRoomUseCase(game);
    const getTableUseCase = new GetTableUseCase(game);
    const addPieceUseCase = new AddPieceUseCase(game);
    const restartUseCase = new RestartUseCase(game);
    const disconnectUseCase = new DisconnectUseCase(game);

    this.io.on('connection', (socket: Socket) => {
      console.log('Player connected!');

      socket.on('createPlayer', (name: string) => {
        try {
          createPlayerUseCase.execute({ name, id: socket.id });
          socket.emit("playerCreated", { name, id: socket.id })
          console.log(`Player created: ${socket.id}`);
        } catch (error) {
          const parsedError = error as Error;
          socket.emit("error", parsedError?.message || "ERROR_CREATE_PLAYER");
        }
      });

      socket.on('removePlayer', () => {
        try {
          removePlayerUseCase.execute({ playerId: socket.id });
          socket.emit("playerRemoved", { id: socket.id })
          console.log(`Player removed: ${socket.id}`);
        } catch (error) {
          const parsedError = error as Error;
          socket.emit("error", parsedError?.message || "ERROR_REMOVE_PLAYER");
        }
      });

      socket.on('createRoom', () => {
        try {
          const room = createRoomUseCase.execute({ id: socket.id });
          socket.join(room.id);
          socket.emit('roomCreated', room.id);
          console.log(`Room created: ${room.id}`);
        } catch (error) {
          const parsedError = error as Error;
          socket.emit("error", parsedError.message || "ERROR_CREATE_ROOM");
        }
      });

      socket.on('joinRoom', (roomId: string) => {
        try {
          const { room, player } = joinRoomUseCase.execute({ playerId: socket.id, roomId });
          socket.join(roomId);
          this.io.to(room.id).emit('playerJoined', player);
          console.log(`Player ${player.id} entered room ${room.id}`);
        } catch (error) {
          const parsedError = error as Error;
          socket.emit("error", parsedError.message || "ERROR_JOIN_ROOM");
        }
      });

      socket.on('getTable', () => {
        try {
          const { table } = getTableUseCase.execute({ playerId: socket.id });
          socket.emit('table', table);
          console.log(`Table: \n ${table}`);
        } catch (error) {
          const parsedError = error as Error;
          socket.emit("error", parsedError.message || "ERROR_GET_TABLE");
        }
      });

      socket.on('addPiece', (row: number) => {
        try {
          const { room, winner } = addPieceUseCase.execute({ playerId: socket.id, row });
          this.io.to(room.id).emit('table', room?.table);
          if (winner) {
            this.io.to(room.id).emit('winner', winner);
          }
          console.log(`Table: \n ${room.id}`);
        } catch (error) {
          const parsedError = error as Error;
          socket.emit('error', parsedError?.message || "ERROR_ADD_PIECE");
        }
      });

      socket.on('restart', () => {
        try {
          const { room } = restartUseCase.execute({ playerId: socket.id });
          this.io.to(room.id).emit('table', room.table);
        } catch (error) {
          const parsedError = error as Error;
          socket.emit('error', parsedError?.message || "ERROR_RESTART");
        }
      });

      socket.on('disconnect', () => {
        try {
          const { room } = disconnectUseCase.execute({ playerId: socket.id });
          if (room) {
            this.io.to(room.id).emit('playerLeft', socket.id);
          }
          console.log(`Player ${socket.id} left room ${room?.id}`);
        } catch (error) {
          const parsedError = error as Error;
          socket.emit('error', parsedError?.message || "ERROR_DISCONNECT");
        }
      });
    });
  }

}