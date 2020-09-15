import { ApolloServer, gql } from 'apollo-server'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import Team from './resolvers/Team'
import Tournament from './resolvers/Tournament'
import Calendar from './resolvers/Calendar'
import merge from 'lodash/merge'

const graphQLTypeDefs = () => {
  return readFileSync(resolve(__dirname, '../dist', 'schema.graphql'), 'utf8')
}

const resolvers = merge(Team, Tournament, Calendar)

const server = new ApolloServer({
  typeDefs: graphQLTypeDefs(),
  resolvers,
  dataSources: () => ({}),
  debug: false,
  cors: {
    origin: 'http://localhost:8080',
  },
})

server.listen(1112, '127.0.0.1').then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
