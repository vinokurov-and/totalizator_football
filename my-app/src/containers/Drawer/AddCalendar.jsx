import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';
import DrawerTemplate from '../../components/DrawerTemplate';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { GET_TOURNAMENTS } from '../../sources/query';
import Loader from '../../components/Loader';

export default ({ ...rest }) => {
  console.log('rest', rest);
  const { called, loading, error, data } = useQuery(GET_TOURNAMENTS);

  const tournaments = called && error ? [] : data?.Tournaments || [];

  return (
    <DrawerTemplate {...rest}>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Title>Добавить матчи в расписание</Title>
            <Autocomplete
              freeSolo
              id="tournament"
              options={tournaments.map(option => option.name)}
              renderInput={params => (
                <TextField {...params} label="Название турнира" margin="normal" variant="outlined" />
              )}
            />
            <Autocomplete
              freeSolo
              id=""
              options={tournaments.map(option => option.name)}
              renderInput={params => (
                <TextField {...params} label="Название турнира" margin="normal" variant="outlined" />
              )}
            />
            <Footer>
              <Button variant="contained">Добавить игры</Button>
              <Button onClick={rest.toggle(false)} variant="contained">
                Закрыть
              </Button>
            </Footer>
          </>
        )}
      </Container>
    </DrawerTemplate>
  );
};

const Title = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  color: #111;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  button:not(:first-child) {
    margin-left: 1em;
  }
`;

const Container = styled.div`
  width: 50vw;
  padding: 32px;
`;
