import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './Storage/Store';
import Login from './pages/Login';
import Task from './pages/Task';
import CreateAccount from './pages/CreateAccount';
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={CreateAccount} />
            <Route exact path="/tasks" component={Task} />
            <Route exact component={Login} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
