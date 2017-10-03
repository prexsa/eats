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
    const { handleSubmit } = this.props;

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
          <RaisedButton type="submit" fullWidth={true}>Submit</RaisedButton>
        </form>
        <div className="link-string">
          <Link to='/register'><b>Register</b></Link> for an account
        </div>
      </div>
    )
  }
}

Login = reduxForm({
  form: 'login'
})(Login);

export default Login = connect(null, actions)(Login);

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)