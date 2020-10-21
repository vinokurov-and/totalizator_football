import Calendar from '../db/Model/Calendar'
import Team from '../db/Model/Team'
import Tournament from '../db/Model/Tournament'
import { Op } from 'sequelize'
import { ForbiddenError } from 'apollo-server'

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
    NewGamesTournaments: async (parent, { id }, context, info) => {
      const games = await Calendar.findAll({
        where: {
          [Op.and]: {
            homeScore: {
              [Op.eq]: null,
            },
            guestScore: {
              [Op.eq]: null,
            },
          },
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
      // console.log("games", games)

      let result = []
      games.forEach((item) => {
        if (item.tournament?.id) {
          const itemTournamentInfoOld = result.find(
            (itemResult) => itemResult.id === item.tournament.id,
          )
          let itemTournamentInfo = itemTournamentInfoOld || { tour: [] }
          const isNewTournament = !itemTournamentInfoOld

          const itemStageOld = itemTournamentInfo.tour.find(
            (itemStage) => itemStage.name === item.stage,
          )
          const itemStage = itemStageOld || { name: item.stage, game: [] }
          const isNewStage = !itemStageOld

          itemTournamentInfo = {
            ...itemTournamentInfo,
            id: item.tournament.id,
            name: item.tournament.name,
          }
          if (isNewStage) {
            itemTournamentInfo.tour.push(itemStage)
          }
          itemStage.game.push({
            date: item.date,
            home: item.home,
            guest: item.guest,
          })

          isNewTournament && result.push(itemTournamentInfo)
        }
      })

      return result
    },
  },
  Mutation: {
    addGames: async (_, { input }, { user }) => {
      if (!user.isAdmin) throw new ForbiddenError('not permitted')

      const data = [...input]

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
