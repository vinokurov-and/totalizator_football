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
}

export default resolvers
