const { GraphQLServer } = require('graphql-yoga');
// const { prisma } = require('./generated/prisma-client');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');

function createServer() {
  return new GraphQLServer({
    typeDefs: 'src/schema.graphql',
    resolvers: {
      Mutation,
      Query,
    },
    context: request => ({
      ...request,
      // prisma,
    }),
  });
}

module.exports = createServer;
