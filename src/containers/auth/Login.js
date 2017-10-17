import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.login(formProps);
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <div className="login-container">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="form-container">
          <div>
            <Field name="email" label="Email" component={renderTextField} type="email"/>
          </div>
          <div>
            <Field name="password" label="Password" component={renderTextField} type="password"/>
          </div>
          <br />
          <br />
          <RaisedButton type="submit" fullWidth={true} disabled={pristine || submitting}>Submit</RaisedButton>
        </form>
        <div className="link-string">
          <Link to='/register'><b>Register</b></Link> for an account
        </div>
      </div>
    )
  }
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const validate = values => {
  const errors = {};
  const requiredFields = [ 'firstName', 'lastName', 'email', 'password' ];
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required';
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
}

Login = reduxForm({
  form: 'login',
  validate
})(Login);

export default Login = connect(null, actions)(Login);
