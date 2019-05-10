import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import NavBar from './component/navBar';
import UserForm from './component/userForm';
import UserTable from './component/userTable';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './component/notFound';

const apiEndPoint = 'http://jsonplaceholder.typicode.com/users';

class App extends Component {
  state = { users: [] };

  async componentDidMount() {
    const { data: users } = await axios.get(apiEndPoint);
    this.setState({ users });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route
            path="/userForm/:id"
            render={props => <UserForm {...props} users={this.state.users} />}
          />
          <Route
            path="/userForm/new"
            render={props => <UserForm {...props} users={this.state.users} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Route
            path="/"
            render={props => <UserTable {...props} users={this.state.users} />}
          />
          <Redirect to="/not-found" />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
