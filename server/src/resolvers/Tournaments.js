// import Event from '../db/Model/Event'
// import Connect from '../db/connection'
// import SqlString from 'sqlstring'

const resolvers = {
  Query: {
    test: async (parent, { id }, context, info) => {
      return [{ id: 1, name: 'Ура' }]
    },
  },
}

export default resolvers
