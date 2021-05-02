import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Asidebar from '../components/Asidebar';
import { Hidden, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

function Index({ children, index }) {
  const classes = useStyles();
  const [asideState, setasideState] = useState(false);
  const asideOp = () => {
    setasideState(!asideState);
  };
  return (
    <>
      <Navbar asideOp={asideOp} />
      <div className={classes.root}>
        <Hidden xsDown>
          <Asidebar variant="permanent" open={true} index={index} />
        </Hidden>
        <Hidden mdUp>
          <Asidebar
            variant="temporary"
            open={asideState}
            onClose={asideOp}
            index={index}
          />
        </Hidden>
        {children}
      </div>
    </>
  );
}

export default Index;
