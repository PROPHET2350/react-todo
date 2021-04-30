import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core';
import AsideBarList from './AsideBarList';
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  toolbar: theme.mixins.toolbar,
}));
const Asidebar = (props) => {
  const classes = useStyles();
  return (
    <>
      <Drawer
        variant={props.variant}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
        open={props.open}
        onClose={props.onClose ? props.onClose : null}
      >
        <div className={classes.toolbar} />
        <AsideBarList />
      </Drawer>
    </>
  );
};

export default Asidebar;
