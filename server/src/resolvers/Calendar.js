import Calendar from '../db/Model/Calendar'
import Team from '../db/Model/Team'
import Tournament from '../db/Model/Tournament'
// import SqlString from 'sqlstring'

const resolvers = {
  Query: {
    Calendar: async (parent, { id }, context, info) => {
      const calendar = await Calendar.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Tournament,
            as: 'tournament',
          },
          {
            model: Team,
            as: 'home',
          },
          {
            model: Team,
            as: 'guest',
          },
        ],
      })
      return calendar
    },
    TournamentGame: async (parent, { id }, context, info) => {
      return {}
    },
  },
}

export default resolvers
