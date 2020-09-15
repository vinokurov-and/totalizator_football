// import { Button } from '@material-ui/core'
import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import useStore from '../hooks/useStore'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  //   LOGIN_EXIT,
} from '../store/actions.js'
import IsAuth from './Authorization/IsAuthehtification'
import IsNonAuth from './Authorization/IsNonAuthehntitfication'

const VK = window.VK

export default () => {
  const {
    state: { authorization },
    dispatch,
  } = useStore()

  const { loading, authentification, user } = authorization

  const handleAuth = useCallback(() => {
    dispatch({ type: LOGIN_REQUEST })
    VK.Auth.login((response) => {
      if (response.session) {
        console.log('info', response)
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.session.user,
        })
      } else {
        dispatch({
          type: LOGIN_FAIL,
        })
      }
    })
  }, [dispatch])

  useEffect(() => {
    handleAuth()
  }, [handleAuth])

  if (loading)
    return (
      <Container>
        <CircularProgress />
      </Container>
    )

  return (
    <Container>
      {authentification ? (
        <IsAuth user={user} />
      ) : (
        <IsNonAuth handleAuth={handleAuth} />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em;
`
