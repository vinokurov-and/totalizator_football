import User from '../db/Model/User'
// import SqlString from 'sqlstring'

const resolvers = {
  Query: {
    User: async (parent, { id }, context, info) => {
      const user = await User.findOne({
        where: {
          mid: id,
        },
      })
      return user
    },
  },
}

export default resolvers
