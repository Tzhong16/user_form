import React, { Component } from 'react';
import Input from './common/input';
import Joi from 'joi-browser';

class UserForm extends Component {
  state = {
    user: {
      email: '',
      username: '',
      name: '',
      phone: '',
      website: ''
    },
    errors: {}
  };

  schema = {
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

  validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.user, this.schema, option);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    console.log('submit');
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const user = { ...this.state.user };
    user[input.name] = input.value;
    this.setState({ user, errors });
  };

  render() {
    const { user, errors } = this.state;
    return (
      <div className="container">
        <h1>User Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="email"
            label="Email"
            value={user.email}
            onChange={this.handleChange}
            error={errors.email}
          />
          <Input
            name="username"
            label="Username"
            value={user.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="name"
            label="Name"
            value={user.name}
            onChange={this.handleChange}
            error={errors.name}
          />
          <Input
            name="phone"
            label="Phone"
            value={user.phone}
            onChange={this.handleChange}
            error={errors.phone}
          />
          <Input
            name="website"
            label="Website"
            value={user.website}
            onChange={this.handleChange}
            error={errors.website}
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default UserForm;
