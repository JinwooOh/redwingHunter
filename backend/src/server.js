const createServer = require('./createServer');

const server = createServer();

server.start(
  {
    // port: 4000,
    cors: {
      credentials: true,
      origin: [
        'https://adoring-ritchie-d533a1.netlify.com/',
        'http://localhost:3000',
      ],
    },
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
