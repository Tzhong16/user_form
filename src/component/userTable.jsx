import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUsers } from '../actions/userAction';

class UserTable extends Component {
  componentWillMount() {
    this.props.fetchUsers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.newUser) {
      this.props.users.unshift(newProps.newUser);
      return;
    }

    if (newProps.updateUser) {
      this.props.users.splice(newProps.updateUser.id, 1, newProps.updateUser);
      this.props.users.shift(); //zen me gao?
    }
  }

  render() {
    return (
      <div className="container">
        <Link to="/userForm/new" className="btn btn-primary">
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
                  <Link to={`/userForm/${u.id}`}>
                    <button className="btn btn-primary btn-sm"> Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

postMessage.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  newUser: PropTypes.object,
  updateUser: PropTypes.object
};

const mapStateToProps = state => ({
  users: state.users.items,
  newUser: state.users.item,
  updateUser: state.users.updatedUser
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UserTable);
