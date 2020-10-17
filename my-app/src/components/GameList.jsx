import React from 'react';
import styled from 'styled-components';
import GameLine from './GameLine';

const data = [
  { home: 'asd', guest: '211' },
  { home: 'asd', guest: '2121' },
  { home: 'a2sd', guest: '211' },
];

export default ({ tournament, game }) => {
  return (
    <Container>
      <Title>{tournament?.name || 'Турнир'} </Title>
      <Subtitle>Выберите команду победителя</Subtitle>
      {data.map(item => (
        <GameLine {...item} />
      ))}
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

const Subtitle = styled.p`
  color: gray;
  margin-bottom: 16px;
  text-align: center;
`;
