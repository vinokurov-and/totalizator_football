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
  },
}

export default resolvers
