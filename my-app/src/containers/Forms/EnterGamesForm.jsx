import React from 'react';
import GameList from '../../components/GameList';
import { Form } from 'react-final-form';

export default ({ data }) => {
  const handleSubmit = values => {
    console.log('values', values);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      render={() => {
        return <GameList {...data} />;
      }}
    />
  );
};
