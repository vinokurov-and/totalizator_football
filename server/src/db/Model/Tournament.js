import { Model, DataTypes } from 'sequelize'
import sequelize from '../../db/connection'

class Tournament extends Model {}
Tournament.init(
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

export default Tournament
