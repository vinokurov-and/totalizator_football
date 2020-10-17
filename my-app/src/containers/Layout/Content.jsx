import React from 'react';
import Grid from '@material-ui/core/Grid';
import EnterGame from '../EnterGame/EnterGame';

import styled from 'styled-components';

export default ({ ...rest }) => {
  return (
    <Container {...rest}>
      <Grid container spacing={3}>
        <EnterGame />
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
`;
