import React from 'react';
import styled from 'styled-components';
import { useQuery, useLazyQuery } from '@apollo/client';
import DrawerTemplate from '../../components/DrawerTemplate';
import { Form } from 'react-final-form';
import { GET_TOURNAMENTS, GET_TOURS } from '../../sources/query';
import Loader from '../../components/Loader';
import AddCalendarForm from '../Forms/AddCalendarForm';
import createDecorator from 'final-form-calculate';

export default ({ ...rest }) => {
  const { called, loading, error, data } = useQuery(GET_TOURNAMENTS);
  const [getTours, { called: calledTours, data: dataTOurs }] = useLazyQuery(GET_TOURS);

  const tournaments = called && error ? [] : data?.Tournaments || [];

  const tours = [];

  const handleSubmit = values => {
    console.log(values);
  };

  const decorators = createDecorator({
    field: 'tournament',
  });

  return (
    <DrawerTemplate {...rest}>
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <Form
            decorators={[decorators]}
            onSubmit={handleSubmit}
            onClose={rest.toggle(false)}
            tournaments={tournaments}
            tours={tours}
            render={AddCalendarForm}
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
