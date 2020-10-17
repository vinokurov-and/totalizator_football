import Team from '../db/Model/Team'
// import SqlString from 'sqlstring'

const resolvers = {
  Query: {
    Team: async (parent, { id }, context, info) => {
      const team = await Team.findOne({
        where: {
          id,
        },
      })
      return team
    },
    Teams: async (parent, {}, context, info) => {
      const teams = await Team.findAll()
      return teams
    },
  },
}

export default resolvers
