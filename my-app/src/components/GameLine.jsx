import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

export default ({ home, guest }) => {
  return (
    <Container>
      <Item>
        <Typography align="center">{home}</Typography>
      </Item>
      <ItemX>X</ItemX>
      <Item>
        <Typography align="center">{guest}</Typography>
      </Item>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Item = styled.div`
  background-color: #68aacc;
  padding: 10px;
  color: #fff;
  border-radius: 3px;
  min-width: 60px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  &:hover {
    box-shadow: 0 0 0 2px gray;
    border-color: gray;
  }
`;

const ItemX = styled(Item)`
  background-color: #fff;
  color: black;
  text-align: center;
`;
