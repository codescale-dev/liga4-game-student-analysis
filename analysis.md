# Análise de Código do Codescale

## Pontos Fortes

### backend

- Ótima implementação das Entidades com Regras de Negócio
- Bom uso de Entidades para fazer operações no Repositório (InMemoryGameRepository)
- Bom uso do padrão Repository para independência do armazenamento dos dados (InMemoryGameRepository)
- Boa implementação das regras de aplicação nos Use Cases (AddPieceUseCase)

### frontend
- Boa separação de componentes nas pastas `/pages` e `/components`
- Bom desacoplamento do React com ReactContext

## Pontos a melhorar

### backend

- Lógica muito complexa para verificar ganhador na entidade Room (checkWinner)
- Evite retornar a Entidade no Use Case (CreateRoomUseCase)
- Separar eventos do Socket em arquivos menores (createPlayer, removePlayer, createRoom e etc)
- Criar uma entidade chamada Game que junta as outras duas entidades Room e Player (DisconnectUseCase)
- RoomRepository e PlayerRepository não foram utilizados

### frontend
- O repositório ficou muito genérico com os métodos do Socket, o ideal seria os repositórios estar relacionado com alguma entidade (SocketServer e SocketRepository)
- O GameListenersUseCase está acoplado com a tecnologia do Socket, seria melhor separar os dois, o listener do Socket ficaria na camada Frameworks e chamaria o use case.
- Organizar melhor as pastas dentro de `src` para deixar bem claro a separação de camadas da Arquitetura Limpa como Entities, Use Cases, Adapters e Frameworks (essas pastas estão misturadas com as pastas do React) *