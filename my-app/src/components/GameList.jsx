import React from 'react';
import styled from 'styled-components';
import GameLine from './GameLine';

const data = [
  { home: 'asd', guest: '211' },
  { home: 'asd', guest: '2121' },
  { home: 'a2sd', guest: '211' },
];

export default ({ name, tour }) => {
  return (
    <Container>
      <Title>{name || 'Турнир'} </Title>
      <Text>Выберите команду победителя</Text>
      {tour.map(itemTour => {
        return (
          <>
            <Subtitle>{itemTour.name}</Subtitle>
            {itemTour.game.map(itemGame => (
              <GameLine home={itemGame.home?.name} guest={itemGame.guest?.name} />
            ))}
          </>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  > div {
    margin-bottom: 8px;
  }
`;

const Title = styled.h2`
  font-size: 16px;
  text-align: center;
`;

const Subtitle = styled.h3`
  font-size: 14px;
  text-align: center;
`;

const Text = styled.p`
  color: gray;
  margin-bottom: 16px;
  text-align: center;
`;
