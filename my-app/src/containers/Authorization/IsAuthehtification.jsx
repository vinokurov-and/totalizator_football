import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLazyQuery, gql } from '@apollo/client';
import useState from '../../hooks/useStore';
import { Button } from '@material-ui/core';
import { getAuthParamsLS } from '../../utils/localStorage';
import { LOGIN_REQUEST, LOGIN_EXIT, LOGIN_FAIL } from '../../store/actions.js';

const VK = window.VK;

const GET_USER = gql`
  query($id: ID) {
    User(id: $id) {
      isAdmin
      name
    }
  }
`;

export default ({ user }) => {
  const [requestExit, { called, loading, data }] = useLazyQuery(GET_USER, { fetchPolicy: 'no-cache' });
  const { dispatch, state } = useState();
  console.log('state', state);

  const handleExit = () => {
    const { token, id } = getAuthParamsLS();
    requestExit({
      variables: {
        id,
      },
      context: {
        headers: {
          id,
          token,
          exit: true,
        },
      },
    });
    localStorage.clear();
    // dispatch({ type: LOGIN_REQUEST });
  };

  useEffect(() => {
    debugger;
    if (called) {
      if (!loading) {
        if (data) {
          dispatch({ type: LOGIN_EXIT });
        } else {
          dispatch({ type: LOGIN_FAIL });
        }
      }
    }
  }, [loading, data, called]);

  return (
    <ContainerCol>
      <Hello>{`Добро пожаловать, ${user.name}`}</Hello>
      <Button onClick={handleExit} variant="contained">
        Выйти
      </Button>
    </ContainerCol>
  );
};

const ContainerCol = styled.div`
  display: flex;
  flex-direction: column;
`;

const Hello = styled.span`
  margin-bottom: 1em;
`;
