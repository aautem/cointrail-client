import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import * as auth from '../../store/actions/auth';

const styles = require('../../styles/app');

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    authenticated: state.auth.authenticated,
    error: state.auth.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: auth.login,
    changePage: auth.changePage,
  }, dispatch);
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      usernameError: null,
      passwordError: null,
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  login() {
    if (this.validInput()) {
      this.props.login(this.state.username, this.state.password);
    }
  }

  validInput() {
    let valid = true;

    if (!this.state.username) {
      valid = false;
      this.setState({ usernameError: 'Missing username' });
    }
    if (!this.state.password || this.state.password.length < 6) {
      valid = false;
      this.setState({ passwordError: 'Password must be at least 6 characters' });
    }

    return valid;
  }

  render() {
    return (
      <Row size={4}>
        <Col>
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
          {this.props.error && <FormValidationMessage>{this.props.error}</FormValidationMessage>}
          <Button
            large
            title='LOGIN'
            backgroundColor='steelblue'
            onPress={this.login.bind(this)}
            loading={this.props.loading}
            disabled={this.props.loading}
          />
          <TouchableHighlight onPress={() => { this.props.changePage('signup') }}>
            <Text>Signup</Text>
          </TouchableHighlight>
          <Text>Forgot Password</Text>
          <Text>Google</Text>
          <Text>Facebook</Text>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func,
  changePage: PropTypes.func,
  loading: PropTypes.bool,
  authenticated: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);