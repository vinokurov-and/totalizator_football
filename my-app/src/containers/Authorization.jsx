// import { Button } from '@material-ui/core'
import React, { useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import styled from 'styled-components';
import useStore from '../hooks/useStore';
import PanelElement from './PanelElement';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  //   LOGIN_EXIT,
} from '../store/actions.js';
import { GET_USER } from '../sources/query';
import IsAuth from './Authorization/IsAuthehtification';
import IsNonAuth from './Authorization/IsNonAuthehntitfication';
import { setAuthParamsLS, getAuthParamsLS } from '../utils/localStorage';
import Loader from '../components/Loader';

const VK = window.VK;

export default () => {
  const {
    state: { authorization },
    dispatch,
  } = useStore();
  const [requestAuth, { called, loading: loadingRequestAuth, data: responseRequestAuth }] = useLazyQuery(GET_USER, {
    fetchPolicy: 'no-cache',
  });

  const { loading: loadingVk, authentification, user } = authorization;
  console.log('authorization', authorization);

  const loading = loadingVk || loadingRequestAuth;

  const getUser = useCallback(
    (id, token) => {
      requestAuth({
        variables: {
          id,
        },
        context: {
          headers: {
            token,
            id,
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
        const { token, id } = getAuthParamsLS();
        const { mid, sid, first_name, last_name } = response.session;
        if (!token || !id) {
          setAuthParamsLS(mid, sid);
        }
        getUser(mid, token || sid, `${first_name} ${last_name}`);
      } else {
        dispatch({
          type: LOGIN_FAIL,
        });

        localStorage.clear();
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const { token, id } = getAuthParamsLS();
    id && token && getUser(id, token);
  }, []);

  useEffect(() => {
    if (!loadingRequestAuth && responseRequestAuth) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...responseRequestAuth.User },
      });
    } else if (!responseRequestAuth) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  }, [loadingRequestAuth, responseRequestAuth]);

  if (loading)
    return (
      <Container>
        <Loader />
      </Container>
    );

  return (
    <Container>
      {user?.isAdmin && <PanelElement />}
      {authentification ? <IsAuth user={user} /> : <IsNonAuth handleAuth={handleAuth} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 2em;
`;
