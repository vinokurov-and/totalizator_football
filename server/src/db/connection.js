import Sequelize from 'sequelize'

const sequelize = new Sequelize('totalizator', 'vinokurov', 'OOray7CX', {
  dialect: 'mysql',
  host: 'localhost',
  logging: console.log,
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Соединение с БД установлено')
  })
  .catch((err) => {
    console.error('Ошибка соединения с БД:', err)
  })

sequelize.sync({ alter: true })
console.log('All models were synchronized successfully.')
 
export default sequelize
