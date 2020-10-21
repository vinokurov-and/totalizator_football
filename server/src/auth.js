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

const verifyVk = async (response, token, isUpdate, isUpdateToken) => {
  if (response) {
    const { first_name, last_name, id } = response[0]
    const name = `${first_name} ${last_name}`
    if (isUpdate || isUpdateToken) {
      const newData = {
        expire: newTimestamp(),
      }
      if (isUpdateToken) {
        newData.access_token = token
      }
      await User.update(newData, {
        where: {
          mid: id,
        },
      })
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

const clearSession = (id) => {
  return User.update(
    { expire: '', access_token: '' },
    {
      where: {
        mid: id,
      },
    },
  )
}

async function getUserFromReq(req) {
  const { headers } = req
  if (headers) {
    const { token, id, exit } = headers
    console.log("getUserFromReq -> headers", headers)
    if (token && id && id !== 'null') {
      const user = await getUser(id)
      if (exit) {
        if (user.access_token === token && user.mid === id)
        {
          await clearSession(id);
          return user;
        }
        return null;
      }
      const isUpdate = user && user.expire && user.expire < moment().unix()
      if (!user || isUpdate || !user.access_token) {
        const verify = await requestVk(token)
        // console.log('getUserFromReq -> verify', verify)
        console.log('Проверка пользователя в БД ВК')
        const result = await verifyVk(
          verify.data.response,
          token,
          isUpdate,
          !user.access_token,
        )
        return result
      } else {
        if (user.access_token !== token) {
          console.log('Токен не совпадает')
          await clearSession(id)
          throw new Error('Токен не совпадает')
        }
        return user
      }
    }
  }
  return null
}

export default getUserFromReq
