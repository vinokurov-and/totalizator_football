import React from 'react';
import Drawer from '@material-ui/core/Drawer';

export default ({ isOpen, toggle, ...rest }) => {
  return <Drawer anchor="left" open={isOpen} onClose={toggle(false)} {...rest} />;
};
