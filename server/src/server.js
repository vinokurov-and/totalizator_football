import { ApolloServer, AuthenticationError, gql } from 'apollo-server'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import Team from './resolvers/Team'
import Tournament from './resolvers/Tournament'
import Calendar from './resolvers/Calendar'
import User from './resolvers/User'
import Tour from './resolvers/Tour'
import merge from 'lodash/merge'
import getUserFromReq from './auth'

const resolvers = merge(Team, Tournament, Calendar, User, Tour)

const server = new ApolloServer({
  typeDefs: readFileSync(
    resolve(__dirname, '../dist', 'schema.graphql'),
    'utf8',
  ),
  resolvers,
  dataSources: () => ({}),
  debug: true,
  context: async ({ req }) => {
    try {
      const user = await getUserFromReq(req)
      return { req, user }
    } catch (e) {
      throw new AuthenticationError(e.message)
    }
  },
  formatError: (err) => {
    return err
  },
  cors: {
    origin: 'http://localhost:3000',
  },
})

server.listen(1113, '127.0.0.1').then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
