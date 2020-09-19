// import { Button } from '@material-ui/core'
import React, { useEffect, useCallback } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import styled from 'styled-components';
import useStore from '../hooks/useStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  //   LOGIN_EXIT,
} from '../store/actions.js';
import IsAuth from './Authorization/IsAuthehtification';
import IsNonAuth from './Authorization/IsNonAuthehntitfication';

const VK = window.VK;

const GET_USER = gql`
  query($id: ID) {
    User(id: $id) {
      isAdmin
      name
    }
  }
`;

export default () => {
  const {
    state: { authorization },
    dispatch,
  } = useStore();
  const [requestAuth, { loading: loadingRequestAuth, data: responseRequestAuth }] = useLazyQuery(GET_USER);
  console.log('responseRequestAuth', responseRequestAuth);

  const { loading: loadingVk, authentification, user } = authorization;

  const loading = loadingVk || loadingRequestAuth;

  const getUser = useCallback(
    (id, token, name) => {
      requestAuth({
        variables: {
          id,
        },
        context: {
          headers: {
            authorization: token,
            id,
            name,
          },
        },
      });
    },
    [requestAuth]
  );

  const handleAuth = useCallback(() => {
    dispatch({ type: LOGIN_REQUEST });
    VK.Auth.login(response => {
      if (response.session) {
        const token = localStorage.getItem('t');
        const id = localStorage.getItem('i');
        if (!token && !id) {
          localStorage.setItem('t', response.session.sid);
          localStorage.setItem('i', response.session.mid);
        }
        getUser(
          response.session.mid,
          token || response.session.sid,
          `${response.session.user.first_name} ${response.session.user.last_name}`
        );
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });
        localStorage.clear();
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const id = localStorage.getItem('i');
    const token = localStorage.getItem('t');
    id && token && getUser(id, token);
  }, []);

  useEffect(() => {
    if (!loadingRequestAuth && responseRequestAuth) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: responseRequestAuth.User,
      });
    }
  }, [loadingRequestAuth, responseRequestAuth]);

  if (loading)
    return (
      <Container>
        <CircularProgress />
      </Container>
    );

  return <Container>{authentification ? <IsAuth user={user} /> : <IsNonAuth handleAuth={handleAuth} />}</Container>;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 2em;
`;
