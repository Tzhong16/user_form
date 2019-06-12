import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { createUsers, updateUser } from '../actions/userAction';

const apiEndPoint = 'https://jsonplaceholder.typicode.com/users';

class UserForm extends Form {
  state = {
    data: {
      email: '',
      username: '',
      name: '',
      phone: '',
      website: ''
    },
    errors: {}
  };

  schema = {
    id: Joi.number(),
    email: Joi.string()
      .required()
      .label('Email'),
    username: Joi.string()
      .required()
      .label('Username'),
    name: Joi.string()
      .required()
      .label('Name'),
    phone: Joi.string()
      .required()
      .label('Phone'),
    website: Joi.string()
      .required()
      .label('Website')
  };

  async componentDidMount() {
    const userId = this.props.match.params.id;
    if (userId === 'new') return;

    // this.props.fetchUserById(userId);
    const { data: user } = await axios.get(apiEndPoint + '/' + userId);
    if (!user) return this.props.history.replace('/not-found');
    // const user = this.props.item;

    this.setState({ data: this.mapToViewModel(user) });
  }

  mapToViewModel(user) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      name: user.name,
      phone: user.phone,
      website: user.website
    };
  }

  doSubmit = () => {
    if (this.props.match.path === '/userForm/new') {
      const user = { ...this.state.data };
      this.props.createUsers(user);
      this.props.history.push('/');
      return;
    } else {
      const user = { ...this.state.data };
      const userId = this.props.match.params.id;
      this.props.updateUser(user, userId);
      this.props.history.push('/');
    }
  };

  render() {
    return (
      <div className="container">
        <h1>User Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email')}
          {this.renderInput('username', 'Username')}
          {this.renderInput('name', 'Name')}
          {this.renderInput('phone', 'Phone')}
          {this.renderInput('website', 'Website')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

UserForm.propTypes = {
  createUsers: PropTypes.func.isRequired
};

export default connect(
  null,
  { createUsers, updateUser }
)(UserForm);
