const createServer = require('./createServer');
require('dotenv').config({ path: 'variables.env' });

const server = createServer();

server.start(
  {
    // port: 4000,
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
