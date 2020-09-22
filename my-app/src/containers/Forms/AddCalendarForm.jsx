import React from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Field, Form } from 'react-final-form';
import { AutoCompleteWrapper } from '../../components/AutocompleteWrapper';

export default ({ onClose, tournaments=[], tours=[], handleSubmit }) => {
console.log("tournaments", tournaments)
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

      {/* <Autocomplete
        freeSolo
        id="tour"
        options={tournaments.map(option => option.name)}
        renderInput={params => (
          <Field component={TextField} name="tour" {...params} label="Тур" margin="normal" variant="filled" />
        )}
      /> */}
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
