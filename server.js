const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  setTimeout(next, 1000); // Adiciona um atraso de 1 segundo em todas as solicitações para simular a latência da rede
});

server.use('/api', router);

server.listen(port, () => {
  console.log(`JSON Server está rodando na porta ${port}`);
});