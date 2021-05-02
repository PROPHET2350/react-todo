import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core';
import AsideBarList from './AsideBarList';
const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    flexShrink: 0
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#EAEAEA',
    boxShadow: '0px 0px 4px #2D44FF'
  },
  toolbar: theme.mixins.toolbar
}));
const Asidebar = props => {
  const classes = useStyles();
  return (
    <>
      <Drawer
        variant={props.variant}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
        open={props.open}
        onClose={props.onClose ? props.onClose : null}
      >
        <div className={classes.toolbar} />
        <AsideBarList index={props.index ? props.index : 1} />
      </Drawer>
    </>
  );
};

export default Asidebar;
