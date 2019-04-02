const createServer = require('./createServer');

const server = createServer();

server.start(deets => {
  console.log(`Server is now running on port http://localhost:${deets.port}`);
});
