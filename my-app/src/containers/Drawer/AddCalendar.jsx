import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import DrawerTemplate from '../../components/DrawerTemplate';
import { Form } from 'react-final-form';
import { GET_TOURNAMENTS, GET_TOURS, GET_TEAMS } from '../../sources/query';
import { SET_GAMES } from '../../sources/mutation';
import Loader from '../../components/Loader';
import AddCalendarForm from '../Forms/AddCalendarForm';
import arrayMutators from 'final-form-arrays';
import { isString } from '../../utils/checkup';

const isSelectItem = item => (!isString(item) ? item.value : undefined);
const isManualItem = item => (isString(item) ? item : undefined);

export default ({ ...rest }) => {
  const { called, loading, error, data } = useQuery(GET_TOURNAMENTS);
  const [getTours, { called: calledTours, data: dataTOurs, error: errorTours }] = useLazyQuery(GET_TOURS, {
    fetchPolicy: 'no-cache',
  });
  const [getTeams, { called: calledTeams, data: dataTeams, error: errorTeams }] = useLazyQuery(GET_TEAMS, {
    fetchPolicy: 'no-cache',
  });

  const [addGames, { called: calledSetTournament, data: dataSetTournament, error: errorSetTournament }] = useMutation(
    SET_GAMES,
    {
      onCompleted: () => {
        rest.toggle(false)();
      },
    }
  );

  const [tours, setTours] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    rest.isOpen && getTeams();
  }, [rest.isOpen && getTeams]);

  useEffect(() => {
    calledTours && errorTours ? setTours([]) : setTours(dataTOurs?.Tours || []);
  }, [dataTOurs, calledTours, errorTours]);

  useEffect(() => {
    calledTeams && errorTeams ? setTeams([]) : setTeams(dataTeams?.Teams || []);
  }, [dataTeams, calledTeams, errorTeams]);

  const tournaments = called && error ? [] : data?.Tournaments || [];

  const handleSubmit = values => {
    addGames({
      variables: {
        input: getObjGames(values, isSelectItem(values.tournament)),
      },
    });
  };

  const getObjGames = (values, idTournament) => {
    return values.game.map(item => {
      return {
        guestId: isSelectItem(item.guest),
        guest: isManualItem(item.guest),
        homeId: isSelectItem(item.home),
        home: isManualItem(item.home),
        tournamentId: idTournament,
        tournament: isManualItem(item.tournament),
        stage: values.tour.value || values.tour,
      };
    });
  };

  const handleClearTour = useCallback(() => setTours([]), []);
  const handleClearTeam = useCallback(() => setTeams([]), []);

  const errorValue = error || errorTours || errorTeams || errorSetTournament;
  if (errorValue)
    return (
      <DrawerTemplate {...rest}>
        <Container>{errorValue.toString()}</Container>
      </DrawerTemplate>
    );

  return (
    <DrawerTemplate {...rest}>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Form
            // decorators={[decorators]}
            mutators={{
              ...arrayMutators,
            }}
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
