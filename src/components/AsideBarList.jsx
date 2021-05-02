import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  makeStyles
} from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import GroupIcon from '@material-ui/icons/Group';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none'
  }
}));

const AsideBarList = props => {
  const [selectedIndex, setSelectedIndex] = useState(
    props.index ? props.index : 1
  );
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const classes = useStyles();
  return (
    <>
      <List>
        <Link to={'/'} className={classes.link}>
          <ListItem
            button
            key={'Home'}
            selected={selectedIndex === 1}
            onClick={event => handleListItemClick(event, 1)}
          >
            <ListItemIcon>
              <BarChartIcon
                color={selectedIndex === 1 ? 'primary' : 'inherit'}
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <Divider />
        </Link>
        <Link to="/tasks" className={classes.link}>
          <ListItem
            button
            key={'Task'}
            selected={selectedIndex === 2}
            onClick={event => handleListItemClick(event, 2)}
          >
            <ListItemIcon>
              <WorkOffIcon
                color={selectedIndex === 2 ? 'primary' : 'inherit'}
              />
            </ListItemIcon>
            <ListItemText primary="Task" />
          </ListItem>
          <Divider />
        </Link>
        <Link to="/team" className={classes.link}>
          <ListItem
            button
            key={'Team'}
            selected={selectedIndex === 3}
            onClick={event => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <GroupIcon color={selectedIndex === 3 ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="Team" />
          </ListItem>
          <Divider />
        </Link>
      </List>
    </>
  );
};

export default AsideBarList;
