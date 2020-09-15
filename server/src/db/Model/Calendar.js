import { Model, DataTypes } from 'sequelize'
import Team from './Team'
import Tournament from './Tournament'
import sequelize from '../../db/connection'

class Calendar extends Model {}
Calendar.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stage: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    timestamps: false,
  },
)

Calendar.belongsTo(Team, { as: 'home' })
Calendar.belongsTo(Team, { as: 'guest' })

Calendar.belongsTo(Tournament, { as: 'tournament' })

// Calendar.belongsTo(Team)

export default Calendar
