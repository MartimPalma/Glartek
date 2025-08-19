### README do Frontend

----

### O que é que usei?

  * **React**: 
  * **Cypress**: pequenos testes para experimentar

-----

### Como é que isto está organizado?

  * `src/api/`: Onde está o ficheiro que faz a ligação com a API do backend (`cronApi.js`)
  * `src/components/`: Aqui estão todos os componentes reutilizáveis para montar as páginas
      * `CronForm.jsx`: O formulário para criar ou editar as tarefas CRON
      * `CronItem.jsx`: Para mostrar uma tarefa CRON na lista
      * `CronList.jsx`: A lista completa de todas as tarefas
      * `CronLogs.jsx`: Onde mostro os logs de cada tarefa
      * `ErrorMessage.jsx`: Para quando algo corre mal, aparece uma mensagem
      * E outros componentes mais pequenos, como `FormField.jsx`, `Header.jsx`, `LogItem.jsx`, que ajudam a montar a interface
  * `src/css/`: Para os ficheiros de estilo. (`styles.css`)

-----

### Ficheiros Principais

  * `App.jsx`: aqui que toda a navegação e estrutura base é definida

-----