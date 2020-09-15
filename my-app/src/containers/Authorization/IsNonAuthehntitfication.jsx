import { Button } from '@material-ui/core'
import React from 'react'

export default ({ handleAuth }) => {
  return (
    <Button onClick={handleAuth} variant="contained">
      Авторизация через вконтакте
    </Button>
  )
}
