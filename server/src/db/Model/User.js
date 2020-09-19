import { Model, DataTypes } from 'sequelize'
import sequelize from '../../db/connection'
// import Calendar from './Calendar'

class User extends Model {}
User.init(
  {
    mid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
    access_token: {
      type: DataTypes.STRING,
    },
    expire: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
)

export default User
