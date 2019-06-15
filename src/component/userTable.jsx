import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUsers } from '../actions/userAction';

class UserTable extends Component {
  componentWillMount() {
    if (!this.props.users.length) {
      this.props.fetchUsers();
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
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.users.items
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UserTable);
