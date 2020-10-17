import Calendar from '../db/Model/Calendar'
import Team from '../db/Model/Team'
import Tournament from '../db/Model/Tournament'
import { Op } from 'sequelize'

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
  Mutation: {
    addGames: async (_, { input }, { dataSources }) => {
      const data = [...input]
      console.log('data', data)

      for (const item of data) {
        if (item.tournament && !item.tournamentId) {
          let tournament = await Tournament.findOne({
            where: {
              name: item.tournament,
            },
          })
          if (!tournament) {
            tournament = await Tournament.create({ name: item.tournament })
          }
          item.tournamentId = tournament.id
        }

        if (item.home && !item.homeId) {
          let team = await Team.findOne({
            where: {
              name: item.home,
            },
          })
          if (!team) {
            team = await Team.create({ name: item.home })
          }
          item.homeId = team.id
        }

        if (item.guest && !item.guestId) {
          let team = await Team.findOne({
            where: {
              name: item.guest,
            },
          })
          if (!team) {
            team = await Team.create({ name: item.guest })
          }
          item.guestId = team.id
        }
      }

      const createGames = await Calendar.bulkCreate(input, {
        fields: ['homeId', 'guestId', 'tournamentId', 'stage'],
      })
      const idGames = createGames.map((item) => ({ id: item.id }))
      const addingGames = await Calendar.findAll({
        where: {
          [Op.or]: idGames,
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

      return addingGames
    },
  },
}

export default resolvers
