import React, { Component } from 'react';
// import logo from './logo.svg';
import Axios from 'axios';
import './App.css';
import NavBar from './component/navBar';
import UserForm from './component/userForm';
import UserTable from './component/userTable';
import { Switch, Route } from 'react-router-dom';

const apiEndPoint = 'http://jsonplaceholder.typicode.com/users';

class App extends Component {
  state = { users: [] };

  async componentDidMount() {
    const { data: users } = await Axios.get(apiEndPoint);
    this.setState({ users });
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/userForm" component={UserForm} />
          <Route
            path="/"
            render={props => <UserTable {...props} users={this.state.users} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
