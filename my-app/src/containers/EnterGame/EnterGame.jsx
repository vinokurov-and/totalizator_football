import { Grid } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import EnterGamesForm from '../Forms/EnterGamesForm';
import { GET_NEW_GAMES_TOURNAMENTS } from '../../sources/query';
import { useQuery } from '@apollo/client';

export default () => {
  const { called: calledGetNewGamesT, data: dataGetNewGamesT, error: errorGetNewGamesT, loading } = useQuery(
    GET_NEW_GAMES_TOURNAMENTS
    // {
    //   fetchPolicy: 'no-cache',
    // }
  );

  // const { called, loading, error, data } = useQuery(GET_TOURNAMENTS);

  if (loading) return 'Загрузка...';
  console.log('dataGetNewGamesT', dataGetNewGamesT);
  return (
    <Container>
      {dataGetNewGamesT.NewGamesTournaments.map(item => (
        <Paper>
          <EnterGamesForm data={item} />
        </Paper>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 10px;
  width: 100%;
`;
