import React from 'react';
import Typography from '@material-ui/core/Typography';
import GameList from '../../components/GameList';
import { Form } from 'react-final-form';

export default () => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      render={() => {
        return <GameList />;
      }}
    />
  );
};
// <Form
//             // decorators={[decorators]}
//             mutators={{
//               ...arrayMutators,
//             }}
//             onSubmit={handleSubmit}
//             onClose={rest.toggle(false)}
//             tournaments={tournaments}
//             tours={tours}
//             teams={teams}
//             render={AddCalendarForm}
//             getTours={getTours}
//             getTeams={getTeams}
//             clearTours={handleClearTour}
//             clearTeams={handleClearTeam}
//           />
