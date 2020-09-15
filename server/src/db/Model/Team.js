import { Model, DataTypes } from 'sequelize'
import sequelize from '../../db/connection'
// import Calendar from './Calendar'

class Team extends Model {}
Team.init(
  {
    name: {
      type: DataTypes.TEXT,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
)

// Team.hasMany(Calendar)

export default Team
