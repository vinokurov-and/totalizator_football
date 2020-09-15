import { ApolloServer, gql } from 'apollo-server'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import ResEvent from './resolvers/Tournaments'
import merge from 'lodash/merge'

const graphQLTypeDefs = () => {
  return readFileSync(resolve(__dirname, '../dist', 'schema.graphql'), 'utf8')
}

const resolvers = merge(ResEvent)

const server = new ApolloServer({
  typeDefs: graphQLTypeDefs(),
  resolvers,
  dataSources: () => ({}),
  debug: false,
  cors: {
    origin: 'http://localhost:8080',
  },
})

server.listen(1111, '127.0.0.1').then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
