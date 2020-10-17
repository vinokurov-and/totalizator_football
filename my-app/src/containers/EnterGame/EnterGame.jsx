import { Grid } from '@material-ui/core';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import EnterGamesForm from '../Forms/EnterGamesForm';

export default () => {
//   const [getTeams, { called: calledTeams, data: dataTeams, error: errorTeams }] = useLazyQuery(GET_TEAMS, {
//     fetchPolicy: 'no-cache',
//   });

  return (
    <>
      <Grid item xs={6} sm={3}>
        <Paper>
          <EnterGamesForm />
        </Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper>xs=6</Paper>
      </Grid>
    </>
  );
};
