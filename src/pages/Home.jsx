import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Asidebar from '../components/Asidebar';
import { Hidden } from '@material-ui/core';

function Home() {
  const [asideState, setasideState] = useState(false);
  const asideOp = () => {
    setasideState(!asideState);
  };

  return (
    <>
      <Navbar asideOp={asideOp} />
      <Hidden xsDown>
        <Asidebar variant="permanent" open={true} />
      </Hidden>
      <Hidden mdUp>
        <Asidebar variant="temporary" open={asideState} onClose={asideOp} />
      </Hidden>
    </>
  );
}

export default Home;
