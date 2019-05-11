import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import axios from 'axios';

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

    const { data: user } = await axios.get(apiEndPoint + '/' + userId);
    if (!user) return this.props.history.replace('/not-found');

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

  // doSubmit = () => {
  //   this.props.history.push('/');
  //   // if (this.props.match.params.id === 'new') {
  //   // const obj = { ...this.state.data };
  //   // const { data: user } = await axios.post(apiEndPoint, obj);
  //   // const users = [user, ...this.props.users];
  //   // this.setState({ users });
  //   // } else {
  //   //   this.props.history.push('/');
  //   // }

  //   // console.log('submit');
  // };

  render() {
    return (
      <div className="container">
        <h1>User Form</h1>
        <form onSubmit={() => this.handleSubmit(this.state.data)}>
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

export default UserForm;
