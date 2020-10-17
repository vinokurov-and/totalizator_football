import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Field } from 'react-final-form';
import { AutoCompleteWrapper } from '../../components/AutocompleteWrapper';
import { FieldArray } from 'react-final-form-arrays';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import RemoveCircleOutlineTwoToneIcon from '@material-ui/icons/RemoveCircleOutlineTwoTone';
import { isNull, isObject, isUndefined } from '../../utils/checkup';

const isSelectable = value => !isUndefined(value) && !isNull(value) && isObject(value);

export default ({
  onClose,
  tournaments = [],
  tours = [],
  handleSubmit,
  values,
  getTours,
  getTeams,
  clearTours,
  clearTeams,
  teams = [],
}) => {
  useEffect(() => {
    if (isSelectable(values.tournament)) {
      getTours({
        variables: {
          id: values.tournament.value,
        },
      });
    }
  }, [values.tournament, getTours, clearTours, clearTeams]);

  const disabledAddGames = !values.tournament || !values.tour || !values.game?.[0].home || !values.game?.[0].guest;

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
        options={tournaments.filter(item => item.name).map(option => ({ value: option.id, label: option.name }))}
        component={AutoCompleteWrapper}
      />

      <Field
        freeSolo
        id="tour"
        name="tour"
        label="Тур"
        margin="normal"
        variant="filled"
        options={tours.filter(item => item.name).map(option => ({ value: option.name, label: option.name }))}
        component={AutoCompleteWrapper}
      />

      <FieldArray name="game">
        {({ fields }) => (
          <div>
            {fields.map((name, index) => (
              <Row key={name}>
                <Item>
                  <Field
                    freeSolo
                    name={`${name}.home`}
                    label="Команда 1"
                    margin="normal"
                    variant="filled"
                    fullWidth
                    options={teams
                      .filter(item => item.name)
                      .map(option => ({ value: option.id, label: option.name }))
                      .filter(item => item.value !== values.game[index].guest?.value)}
                    component={AutoCompleteWrapper}
                  />
                </Item>
                <Item>
                  <Field
                    freeSolo
                    name={`${name}.guest`}
                    fullWidth
                    label="Команда 2"
                    margin="normal"
                    variant="filled"
                    options={teams
                      .filter(item => item.name)
                      .map(option => ({ value: option.id, label: option.name }))
                      .filter(item => item.value !== values.game[index].home?.value)}
                    component={AutoCompleteWrapper}
                  />
                </Item>
                <CotnainerIconRemove>
                  <RemoveCircleOutlineTwoToneIcon onClick={() => fields.remove(index)} />
                </CotnainerIconRemove>
              </Row>
            ))}
            <CotnainerIcon>
              <AddCircleOutlineTwoToneIcon onClick={() => fields.push({ home: '', guest: '' })} />
            </CotnainerIcon>
          </div>
        )}
      </FieldArray>

      <Footer>
        <Button onClick={handleSubmit} disabled={disabledAddGames} variant="contained">
          Добавить игры
        </Button>
        <Button onClick={onClose} variant="contained">
          Закрыть
        </Button>
      </Footer>
    </Container>
  );
};

const CotnainerIcon = styled.div`
  padding: 10px;
  margin-left: -10px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  right: -100%;
  transform: translateX(-50%);
`;

const CotnainerIconRemove = styled(CotnainerIcon)`
  padding: 0;
  margin-left: 10px;
  bottom: -5px;
  position: relative;
  right: -2px;
  transform: none;
`;

const Title = styled.div`
  font-size: 1.3em;
  font-weight: bold;
  color: #111;
`;

const Item = styled.div`
  width: 98%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  ${Item}:first-child {
    margin-right: 4px;
  }
  ${Item}:last-child {
    margin-left: 4px;
  }
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
