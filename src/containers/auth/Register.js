import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Register extends Component {
  handleFormSubmit(formProps) {
    // console.log('formProps: ', formProps);
    this.props.register(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="register-container">
        <h2 className="title">Create an Account</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-container">
          <div>
            <Field name="firstName" label="First Name" component={renderTextField} type="text"/>
          </div>
          <div>
            <Field name="lastName" label="Last Name" component={renderTextField} type="text"/>
          </div>
          <div>
            <Field name="email" label="Email" component={renderTextField} type="email"/>
          </div>
          <div>
            <Field name="password" label="Password" component={renderTextField} type="password"/>
          </div>
          <br />
          <br />
          <RaisedButton type="submit" fullWidth={true}>Submit</RaisedButton>
        </form>
      </div>
    )
  }
}

Register = reduxForm({
  form: 'register'
})(Register);

export default Register = connect(null, actions)(Register);


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)