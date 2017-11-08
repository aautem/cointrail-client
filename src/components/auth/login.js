import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { FormLabel, FormInput, FormValidationMessage, Button, Icon } from 'react-native-elements';
import * as auth from '../../store/actions/auth';
const appSS = require('../../styles/app');

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
      <Col size={14/14}>

        {/* FORM CONTAINER */}
        <Row size={9/18} style={[]}>
          <Col size={14/14} style={{ justifyContent: 'center' }}>
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
          </Col>
        </Row>

        {/* BUTTON CONTAINER */}
        <Row size={4/18} style={[appSS.center]}>
          <Col size={1/14}></Col>
          <Col size={12/14}>
            <Button
              large
              title='Login'
              icon={{name: 'lock-open', type: 'material', size: 20 }}
              backgroundColor='steelblue'
              onPress={this.login.bind(this)}
              disabled={this.props.loading}
              borderRadius={5}
              containerViewStyle={{ borderRadius: 5 }}
            />
            <Row size={1/4} style={{ paddingTop: 5 }}>
              <Col size={7/14}>
                <TouchableHighlight
                  onPress={() => { console.log('Remembering password...') }}>
                  <Text style={{ paddingLeft: 20, color: 'steelblue' }}>Forgot Password</Text>
                </TouchableHighlight>
              </Col>
              <Col size={7/14}>
                <TouchableHighlight
                  onPress={() => { this.props.changePage('signup') }}>
                  <Text style={{ textAlign: 'right', paddingRight: 20, color: 'steelblue' }}>Signup to Play</Text>
                </TouchableHighlight>
              </Col>
            </Row>
          </Col>
          <Col size={1/14}></Col>
        </Row>

        {/* SOCIAL BUTTONS CONTAINER */}
        <Row size={5/18} style={[appSS.center]}>
          <Col size={7/14}>
            <Icon
              name='google--with-circle'
              type='entypo'
              color='red'
              size={80}
              onPress={() => console.log('hello')}
            />
          </Col>
          <Col size={7/14}>
            <Icon
              name='facebook-with-circle'
              type='entypo'
              color='steelblue'
              size={80}
              onPress={() => console.log('hello')}
            />
          </Col>
        </Row>

      </Col>
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