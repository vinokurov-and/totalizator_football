import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useQuery, useLazyQuery } from '@apollo/client';
import DrawerTemplate from '../../components/DrawerTemplate';
import { Form } from 'react-final-form';
import { GET_TOURNAMENTS, GET_TOURS } from '../../sources/query';
import Loader from '../../components/Loader';
import AddCalendarForm from '../Forms/AddCalendarForm';

export default ({ ...rest }) => {
  const { called, loading, error, data } = useQuery(GET_TOURNAMENTS);
  const [getTours, { called: calledTours, data: dataTOurs, error: errorTours }] = useLazyQuery(GET_TOURS);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    calledTours && errorTours ? setTours([]) : setTours(dataTOurs?.Tours || []);
  }, [dataTOurs]);

  const tournaments = called && error ? [] : data?.Tournaments || [];

  const handleSubmit = values => {
    console.log(values);
  };

  const handleClearTour = useCallback(() => setTours([]), []);

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
                changeValue(state, "tour", () => undefined);
              }
            }}
            onSubmit={handleSubmit}
            onClose={rest.toggle(false)}
            tournaments={tournaments}
            tours={tours}
            render={AddCalendarForm}
            getTours={getTours}
            clearTours={handleClearTour}
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
