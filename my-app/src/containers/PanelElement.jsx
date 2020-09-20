import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import AddCalendar from './Drawer/AddCalendar';

export default () => {
  const [isOpen, setOpen] = useState(false);
  const handleToggle = value => () => setOpen(value);
  return (
    <Container>
      <Button onClick={handleToggle(true)} variant="contained">
        Добавить
      </Button>
      <AddCalendar isOpen={isOpen} toggle={handleToggle} />
    </Container>
  );
};

const Container = styled.div`
  margin-right: 2em;
  display: flex;
`;
