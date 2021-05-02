import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  makeStyles,
  Slide,
  TextField
} from '@material-ui/core';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Index from '../layout/Index';
import SendIcon from '@material-ui/icons/Send';
import Load from '../components/Load';
import ErrorAlert from '../components/Flash/ErrorAlert';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    marginTop: theme.spacing(3)
  },
  list: {
    border: '1px',
    borderRadius: '5px',
    backgroundColor: '#EAEAEA',
    boxShadow: '0px 0px 4px #2D44FF'
  }
}));
function Task() {
  const user = useSelector(state => state.user);
  const location = useHistory();
  const [TaskData, setTaskData] = useState([]);
  const classes = useStyles();
  const [checked, setChecked] = useState([0]);
  const [open, setOpen] = useState(false);
  const [AlertData, setAlertData] = useState({
    open: false,
    message: '',
    AlertType: ''
  });
  const [LoadState, setLoadState] = useState(false);
  const handleCloseAlert = () => {
    setAlertData({
      ...AlertData,
      open: false
    });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const fetchData = async () => {
    try {
      let data = await (
        await fetch('http://192.168.100.3:8081/tasks/' + user.id)
      ).json();
      setTaskData(data);
    } catch (error) {
      setAlertData({
        open: true,
        message: 'Algo fue mal',
        AlertType: 'error'
      });
    }
  };
  const handleAddTask = async e => {
    e.preventDefault();
    setOpen(false);
    setLoadState(true);
    try {
      let req = {
        id: user.id,
        descr: e.target[0].value
      };
      let config = {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
      };
      let res = await (
        await fetch('http://192.168.100.3:8081/add-task', config)
      ).json();
      e.target[0].value = '';
      if (res.code === 'success') {
        setLoadState(false);
        setAlertData({
          open: true,
          message: 'Tarea Agregada',
          AlertType: 'success'
        });
      } else {
        setLoadState(false);
        setAlertData({
          open: true,
          message: 'Algo fue mal',
          AlertType: 'error'
        });
      }
    } catch (error) {
      setLoadState(false);
      setAlertData({
        open: true,
        message: 'Algo fue mal',
        AlertType: 'error'
      });
    }
  };
  const handleDeleteTask = e => async () => {
    if (window.confirm('Are u sure about that?')) {
      setLoadState(true);
      try {
        let config = {
          method: 'DELETE',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        let response = await (
          await fetch('http://192.168.100.3:8081/task/' + e, config)
        ).json();
        if (response.code === 'success') {
          setAlertData({
            open: true,
            message: 'Tarea Eliminada',
            AlertType: 'success'
          });
          setLoadState(false);
        } else {
          setAlertData({
            open: true,
            message: 'Algo fue mal en el if',
            AlertType: 'error'
          });
          setLoadState(false);
        }
      } catch (error) {
        setAlertData({
          open: true,
          message: 'Algo fue mal catch',
          AlertType: 'error'
        });
        setLoadState(false);
      }
    }
  };
  const handleUpdateTask = async e => {
    e.preventDefault();
    if (window.confirm('Are u sure about that?')) {
      setLoadState(true);
      try {
        let id = await e.target[1].name.split('-')[1];
        let req = await {
          descr: e.target[1].value
        };
        let config = {
          method: 'PUT',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(req)
        };
        let res = await (
          await fetch('http://192.168.100.3:8081/task/' + id, config)
        ).json();
        if (res.code === 'success') {
          setAlertData({
            open: true,
            message: 'Tarea Actualizada',
            AlertType: 'success'
          });
          setLoadState(false);
        } else {
          setAlertData({
            open: true,
            message: 'Algo fue mal',
            AlertType: 'error'
          });
          setLoadState(false);
        }
      } catch (error) {
        setAlertData({
          open: true,
          message: 'Algo fue mal',
          AlertType: 'error'
        });
        setLoadState(false);
      }
    }
  };
  useEffect(() => {
    if (Object.entries(user).length === 0) {
      location.push('/sign-in');
    }

    fetchData();
  }, [TaskData]);
  return (
    <>
      <Index index={2}>
        <div className={classes.container}>
          <Grid
            container
            spacing={1}
            direction="row"
            alignItems="center"
            alignContent="center"
            justify="center"
          >
            <Grid container item xs={11} lg={11}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleClickOpen}
              >
                add Task
              </Button>
            </Grid>
            {Object.entries(TaskData).length !== 0 ? (
              <Grid item xs={11} lg={11}>
                <List className={classes.list}>
                  {TaskData.map(task => {
                    return (
                      <form onSubmit={handleUpdateTask}>
                        <ListItem key={task.id} role={undefined} dense>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(task.id) !== -1}
                              onClick={handleToggle(task.id)}
                              disableRipple
                              inputProps={{
                                'aria-labelledby':
                                  'checkbox-list-label-' + task.id
                              }}
                            />
                          </ListItemIcon>
                          <TextField
                            name={'textfield-' + task.id}
                            disabled={checked.indexOf(task.id) !== -1}
                            defaultValue={task.descr}
                            inputProps={{
                              min: 0,
                              style: { textAlign: 'center' }
                            }}
                            fullWidth
                          />
                          <ListItemSecondaryAction>
                            <IconButton
                              edge="end"
                              aria-label="comments"
                              type="submit"
                            >
                              <SendIcon />
                            </IconButton>
                            <IconButton
                              edge="end"
                              aria-label="comments"
                              onClick={handleDeleteTask(task.id)}
                            >
                              <DeleteForeverTwoToneIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </form>
                    );
                  })}
                </List>
              </Grid>
            ) : (
              <Grid container item xs={11} lg={11}>
                <h4>U don't have task</h4>
              </Grid>
            )}
          </Grid>
        </div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          fullWidth
        >
          <form onSubmit={handleAddTask}>
            <DialogTitle id="alert-dialog-slide-title">
              {'Add Task'}
            </DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item lg={12}>
                  <TextField fullWidth />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="outlined"
              >
                Disagree
              </Button>
              <Button type="submit" color="primary" variant="outlined">
                Agree
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <ErrorAlert
          open={AlertData.open}
          message={AlertData.message}
          onClose={handleCloseAlert}
          AlertType={AlertData.AlertType}
        />
        <Load open={LoadState} />
      </Index>
    </>
  );
}

export default Task;
