import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import store from './Storage/Store';
import Login from './pages/Login';
function App() {
  console.log(store.getState());
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sign-in" component={Login} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
