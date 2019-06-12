import React, { Component } from 'react';
import './App.css';
import NavBar from './component/navBar';
import UserForm from './component/userForm';
import UserTable from './component/userTable';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import NotFound from './component/notFound';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Provider store={store}>
          <Switch>
            <Route
              path="/userForm/new"
              render={props => <UserForm {...props} />}
            />
            <Route
              path="/userForm/:id"
              render={props => <UserForm {...props} />}
            />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact render={props => <UserTable {...props} />} />
            <Redirect to="/not-found" />
          </Switch>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;
