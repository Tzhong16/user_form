import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserTable extends Component {
  render() {
    return (
      <div className="container">
        <Link to="/userForm" className="btn btn-primary">
          New User
        </Link>

        <p>There are {this.props.users.length} users in database</p>

        <table className="table ">
          <thead>
            <tr>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(u => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>
                  <button className="btn btn-primary btn-sm"> Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default UserTable;
