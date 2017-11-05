import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Auth0 from 'react-native-auth0';

const styles = require('../../styles/app');

function mapStateToProps(state) {
  return {
    //
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailError: null,
      usernameError: null,
      passwordError: null,
      confirmPasswordError: null,
      auth0Error: null,
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  createUser() {
    // const valid = this.validInput();
    console.log('*** THIS ***', this);

    if (valid) {
      // sign up
    }
  }

  validInput() {
    let valid = true;

    if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      valid = false;
      this.setState({ emailError: 'invalid email address' });
    }
    if (this.state.username.length < 1 || this.state.username.length > 15) {
      valid = false;
      this.setState({ usernameError: 'username must be less than 15 characters' });
    }
    if (this.state.password.length < 6) {
      valid = false;
      this.setState({ passwordError: 'password must be at least 6 characters' });
    }
    if (this.state.password !== this.state.confirmPassword) {
      valid = false;
      this.setState({ passwordError: 'passwords don\'t match' });
    }

    return valid;
  }

  render() {
    return (
      <Row size={4}>
      <Col>
        <FormLabel>Email</FormLabel>
          <FormInput
            onChangeText={(value) => {
              this.setState({ email: value });
            }}
          />
          {this.state.emailError && <FormValidationMessage>{this.state.emailError}</FormValidationMessage>}
          <FormLabel>Username</FormLabel>
          <FormInput
            onChangeText={(value) => {
              this.setState({ username: value });
            }}
          />
          {this.state.usernameError && <FormValidationMessage>{this.state.usernameError}</FormValidationMessage>}
          <FormLabel>Password</FormLabel>
          <FormInput
            onChangeText={(value) => {
              this.setState({ password: value });
            }}
          />
          {this.state.passwordError && <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>}
          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            onChangeText={(value) => {
              this.setState({ confirmPassword: value });
            }}
          />
          {this.state.confirmPasswordError && <FormValidationMessage>{this.state.confirmPasswordError}</FormValidationMessage>}
          {this.state.auth0Error && <FormValidationMessage>{this.state.auth0Error}</FormValidationMessage>}
          <Button
            large
            title='SIGN UP'
            backgroundColor='steelblue'
            onPress={() => { console.log('*** THIS ***') }}
            loading={this.props.loading}
            disabled={this.props.loading}
          />
        </Col>
      </Row>
    );
  }
}

Signup.propTypes = {
  auth0: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);