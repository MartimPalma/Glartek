
### README do Backend

**backend**  construído com **Node.js** e **Express**

### O que é que usei?

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**: biblioteca que comuinca com o MongoDB.
- **node-cron**: ferramenta para agendar as tarefas para elas correrem sozinhas
- **axios**:  pedidos HTTP

### Como é que isto está organizado?

Organizei tudo por pastas

- `config/`: Aqui é o sítio onde faço a ligação à base de dados para a aplicação funcionar
- `controllers/`: Recebe os pedidos da API e manda o serviço de CRON 
- `models/`: Aqui defino como é que os dados das tarefas CRON são guardados na base de dados
- `routes/`: É onde defino os caminhos (as URLs) para a API, cada caminho tem o seu trabalho específico
- `middlewares/:` São funções que processam os pedidos antes de chegarem ao controlador. É um "filtro" ou uma "porta de entrada" para a API.
- `services/`: Tem toda a lógica para criar, ver, atualizar, apagar e executar as tarefas
  - `httpService.js`: Ficheiro à parte só para fazer os pedidos HTTP

