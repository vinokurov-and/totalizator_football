import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Field, Form } from 'react-final-form';
import { AutoCompleteWrapper } from '../../components/AutocompleteWrapper';
import { isNull, isObject, isUndefined } from '../../utils/checkup';

const isSelectable = value => !isUndefined(value) && !isNull(value) && isObject(value);

export default ({ onClose, tournaments = [], tours = [], handleSubmit, values, getTours, clearTours, form }) => {
  useEffect(() => {
    if (isSelectable(values.tournament)) {
      getTours({
        variables: {
          id: values.tournament.value,
        },
      });
    } else {
      clearTours();
    }
  }, [values.tournament, getTours, clearTours]);

  return (
    <Container>
      <Title>Добавить матчи в расписание</Title>
      <Field
        freeSolo
        id="tournament"
        name="tournament"
        label="Название турнира"
        margin="normal"
        variant="filled"
        options={tournaments.map(option => ({ value: option.id, label: option.name }))}
        component={AutoCompleteWrapper}
      />

      <Field
        freeSolo
        id="tour"
        name="tour"
        label="Тур"
        margin="normal"
        variant="filled"
        options={tours.map(option => ({ value: option.id, label: option.name }))}
        component={AutoCompleteWrapper}
      />

      <Footer>
        <Button onClick={handleSubmit} variant="contained">
          Добавить игры
        </Button>
        <Button onClick={onClose} variant="contained">
          Закрыть
        </Button>
      </Footer>
    </Container>
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
  .MuiAutocomplete-inputRoot[class*='MuiFilledInput-root'] {
    padding-top: 0;
  }
  > div {
    margin-top: 1em;
  }
`;
