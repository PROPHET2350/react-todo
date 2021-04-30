import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import React from 'react';

const AsideBarList = () => {
  return (
    <>
      <List>
        <ListItem button key={'Home'}>
          <ListItemIcon>
            <BarChartIcon color="action" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <Divider />
        <ListItem button key={'Task'}>
          <ListItemIcon>
            <WorkOffIcon />
          </ListItemIcon>
          <ListItemText primary="Task" />
        </ListItem>
        <Divider />
      </List>
    </>
  );
};

export default AsideBarList;
