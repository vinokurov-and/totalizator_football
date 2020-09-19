import { ApolloServer, gql } from 'apollo-server'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import Team from './resolvers/Team'
import Tournament from './resolvers/Tournament'
import Calendar from './resolvers/Calendar'
import User from './resolvers/User'
import merge from 'lodash/merge'
import getUserFromReq from './auth'

const resolvers = merge(Team, Tournament, Calendar, User)

const server = new ApolloServer({
  typeDefs: readFileSync(
    resolve(__dirname, '../dist', 'schema.graphql'),
    'utf8',
  ),
  resolvers,
  dataSources: () => ({}),
  debug: true,
  context: async ({ req }) => {
    let user
    try {
      user = await getUserFromReq(req)
    } catch (e) {
      return { req, user: null }
    }
    return { req, user }
  },
  cors: {
    origin: 'http://localhost:3000',
  },
})

server.listen(1113, '127.0.0.1').then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
