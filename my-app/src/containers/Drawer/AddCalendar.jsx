import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useQuery, useLazyQuery } from '@apollo/client';
import DrawerTemplate from '../../components/DrawerTemplate';
import { Form } from 'react-final-form';
import { GET_TOURNAMENTS, GET_TOURS, GET_TEAMS } from '../../sources/query';
import Loader from '../../components/Loader';
import AddCalendarForm from '../Forms/AddCalendarForm';
import arrayMutators from 'final-form-arrays';

export default ({ ...rest }) => {
  const { called, loading, error, data } = useQuery(GET_TOURNAMENTS);
  const [getTours, { called: calledTours, data: dataTOurs, error: errorTours }] = useLazyQuery(GET_TOURS);
  const [getTeams, { called: calledTeams, data: dataTeams, error: errorTeams }] = useLazyQuery(GET_TEAMS);

  const [tours, setTours] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    calledTours && errorTours ? setTours([]) : setTours(dataTOurs?.Tours || []);
  }, [dataTOurs, calledTours, errorTours]);

  useEffect(() => {
    calledTeams && errorTeams ? setTeams([]) : setTeams(dataTeams?.Teams || []);
  }, [dataTeams, calledTeams, errorTeams]);

  const tournaments = called && error ? [] : data?.Tournaments || [];

  const handleSubmit = values => {
    console.log(values);
  };

  const handleClearTour = useCallback(() => setTours([]), []);
  const handleClearTeam = useCallback(() => setTeams([]), []);

  return (
    <DrawerTemplate {...rest}>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Form
            // decorators={[decorators]}
            mutators={{
              clearTours: ([tour], state, { changeValue }) => {
                changeValue(state, 'tour', () => undefined);
              },
              ...arrayMutators,
            }}
            initialValues={{ game: [{ firstTeam: '', secondTeam: '' }] }}
            onSubmit={handleSubmit}
            onClose={rest.toggle(false)}
            tournaments={tournaments}
            tours={tours}
            teams={teams}
            render={AddCalendarForm}
            getTours={getTours}
            getTeams={getTeams}
            clearTours={handleClearTour}
            clearTeams={handleClearTeam}
          />
        )}
      </Container>
    </DrawerTemplate>
  );
};

const Container = styled.div`
  width: 50vw;
  padding: 32px;
`;
