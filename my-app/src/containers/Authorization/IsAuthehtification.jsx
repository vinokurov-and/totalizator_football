import React from 'react'
import styled from 'styled-components'
import useState from '../../hooks/useStore'
import { Button } from '@material-ui/core'
import {
  LOGIN_REQUEST,
  LOGIN_EXIT,
  LOGIN_SUCCESS,
} from '../../store/actions.js'

const VK = window.VK

export default ({ user }) => {
  const { dispatch } = useState()

  const handleExit = () => {
    dispatch({ type: LOGIN_REQUEST })
    VK.Auth.logout((response) => {
      if (response.status === 'unknown') {
        dispatch({ type: LOGIN_EXIT })
      } else {
        dispatch({ type: LOGIN_SUCCESS })
      }
    })
  }

  return (
    <ContainerCol>
      <Hello>{`Добро пожаловать, ${user.first_name}`}</Hello>
      <Button onClick={handleExit} variant="contained">
        Выйти
      </Button>
    </ContainerCol>
  )
}

const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
`

const Hello = styled.span`
  margin-bottom: 1em;
`
