import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

const styles = require('../../styles/app');

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
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
      email: null,
      username: null,
      password: null,
      confirmPassword: null,
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
    if (this.validInput()) {
      // const params = {
      //   email: this.state.email,
      //   username: this.state.username,
      //   password: this.state.password,
      //   connection: 'Username-Password-Authentication',
      // };

      // this.props.auth0.auth.createUser(params).then((user) => {
      //   console.log('*** USER CREATED ***', user);

      //   // user = {
      //   //   "Id": "59fe8c96b84acc463c6e9713",
      //   //   "email": "aautem@trifinlabs.com",
      //   //   "emailVerified": false,
      //   //   "username": "aa",
      //   // };

      //   // login user and route to menu
        
      // }).catch((e) => {
      //   console.log(e);
      //   this.setState({ auth0Error: e });
      // });
    }
  }

  validInput() {
    let valid = true;

    if (!this.state.email || !this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      valid = false;
      this.setState({ emailError: 'invalid email address' });
    }
    if (!this.state.username || this.state.username.length < 1 || this.state.username.length > 15) {
      valid = false;
      this.setState({ usernameError: 'username must be between 1 and 15 characters' });
    }
    if (!this.state.password || this.state.password.length < 6) {
      valid = false;
      this.setState({ passwordError: 'password must be at least 6 characters' });
    }
    if (!this.state.confirmPassword || this.state.password !== this.state.confirmPassword) {
      valid = false;
      this.setState({ confirmPasswordError: 'passwords don\'t match' });
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
              this.setState({ email: value, emailError: null });
            }}
          />
          {this.state.emailError && <FormValidationMessage>{this.state.emailError}</FormValidationMessage>}
          <FormLabel>Username</FormLabel>
          <FormInput
            maxLength={15}
            onChangeText={(value) => {
              this.setState({ username: value, usernameError: null });
            }}
          />
          {this.state.usernameError && <FormValidationMessage>{this.state.usernameError}</FormValidationMessage>}
          <FormLabel>Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            onChangeText={(value) => {
              this.setState({ password: value, passwordError: null });
            }}
          />
          {this.state.passwordError && <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>}
          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            secureTextEntry={true}
            onChangeText={(value) => {
              this.setState({ confirmPassword: value, confirmPasswordError: null });
            }}
          />
          {this.state.confirmPasswordError && <FormValidationMessage>{this.state.confirmPasswordError}</FormValidationMessage>}
          {this.state.auth0Error && <FormValidationMessage>{this.state.auth0Error}</FormValidationMessage>}
          <Button
            large
            title='SIGN UP'
            backgroundColor='steelblue'
            onPress={this.createUser.bind(this)}
            loading={this.props.loading}
            disabled={this.props.loading}
          />
        </Col>
      </Row>
    );
  }
}

Signup.propTypes = {
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);