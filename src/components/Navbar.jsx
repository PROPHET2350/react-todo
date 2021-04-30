import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import {
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1
  },
  leftnav: {
    flexGrow: 1,
    display: 'flex'
  },
  navicon: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}));

const Navbar = props => {
  const [accountMenu, setaccountMenu] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector(state => state.user);
  const classes = useStyles();
  const handleClick = event => {
    setaccountMenu(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setaccountMenu(null);
  };
  return (
    <AppBar position="fixed" className={classes.root} color="primary">
      <Toolbar>
        <div className={classes.leftnav}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.navicon}
            onClick={() => props.asideOp()}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" color="initial">
            Todo
          </Typography>
        </div>
        {Object.entries(state).length === 0 ? (
          <Button variant="outlined" href={'./sign-in'} color="secondary">
            login
          </Button>
        ) : (
          <div className="">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar></Avatar>
            </Button>
            <Menu
              id="account-menu"
              anchorEl={accountMenu}
              keepMounted
              open={Boolean(accountMenu)}
              onClose={handleCloseAccountMenu}
            >
              <MenuItem onClick={handleCloseAccountMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseAccountMenu}>My account</MenuItem>
              <MenuItem onClick={handleCloseAccountMenu}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
