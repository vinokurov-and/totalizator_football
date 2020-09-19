import User from './db/Model/User'
import moment from 'moment'
import network from './services/network'

const requestVk = (token) =>
  network.get(
    `https://api.vk.com/method/users.get?access_token=${token}&v=5.124`,
  )

const createUser = async (token, name, id) => {
  const newUser = await User.create({
    mid: id,
    isAdmin: false,
    access_token: token,
    expire: newTimestamp(),
    name,
  })
  return newUser
}

const newTimestamp = () => moment().add(1, 'day').unix().toString()

const verifyVk = async (response, token, isUpdate) => {
  console.log('verifyVk -> response', response)
  if (response) {
    const { first_name, last_name, id } = response[0]
    const name = `${first_name} ${last_name}`
    if (isUpdate) {
      const updateUser = await User.update(
        { expire: newTimestamp() },
        {
          where: {
            mid: id,
          },
        },
      )
      const user = await getUser(id)
      return user
    }
    const newUser = await createUser(token, name, id)
    return newUser
  } else {
    return null
  }
}

const getUser = async (id) => {
  const user = await User.findOne({
    where: {
      mid: id,
    },
  })
  return user
}

async function getUserFromReq(req) {
  const { headers } = req
  if (headers) {
    const { authorization, id } = headers
    if (authorization && id) {
      const user = await getUser(id)
      console.log(moment().unix())
      const isUpdate = user && user.expire < moment().unix()
      if (!user || isUpdate) {
        console.log('Проверка пользователя в БД ВК')
        const verify = await requestVk(authorization)
        const result = await verifyVk(
          verify.data.response,
          authorization,
          isUpdate,
        )
        return result
      } else {
        console.log(user.name, 'Пользователь найден')
        return user
      }
    }
  }
  return null
}

export default getUserFromReq
