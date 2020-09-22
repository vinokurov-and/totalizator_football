import Calendar from '../db/Model/Calendar'
// import SqlString from 'sqlstring'

const resolvers = {
  Query: {
    Tours: async (parent, { id }, context, info) => {
      const tours = await Calendar.findAll({
        where: {
          tournamentId: id,
        },
        group: ['stage']
      })
      return tours.map(item=>({name: item.stage}));
    },
  },
}

export default resolvers
