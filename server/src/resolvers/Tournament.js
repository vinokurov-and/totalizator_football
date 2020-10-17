import Tournament from '../db/Model/Tournament'
// import SqlString from 'sqlstring'

const resolvers = {
  Query: {
    Tournament: async (parent, { id }, context, info) => {
      const tournament = await Tournament.findOne({
        where: {
          id,
        },
      })
      return tournament
    },
    Tournaments: async (parent, { id }, context, info) => {
      const allTournaments = await Tournament.findAll()
      return allTournaments
    },
  },
  Mutation: {
    addTournament: async (_, { name }, { dataSources }) => {
      const tournament = await Tournament.create(
        {
          name: name,
        },
        { fields: ['name'] },
      )
      return tournament
    },
  },
}

export default resolvers
