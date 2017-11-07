import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { FormLabel, FormInput, FormValidationMessage, Button, Icon } from 'react-native-elements';
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
      <Col size={14}>
        <Row size={7}>
          <Col size={1}></Col>
          <Col size={12}>
            <Row size={1}><FormLabel>Username</FormLabel></Row>
            <Row size={2}>
              <FormInput
                maxLength={15}
                onChangeText={(value) => {
                  this.setState({ username: value, usernameError: null });
                }}
                style={{ width: 310, paddingTop: 30 }}
              />
            </Row>
            <Row size={1}><FormLabel>Password</FormLabel></Row>
            <Row size={2}>
              <FormInput
                secureTextEntry={true}
                onChangeText={(value) => {
                  this.setState({ password: value, passwordError: null });
                }}
                style={{ width: 310, paddingTop: 30 }}
              />
            </Row>
            <Row size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
              {this.state.usernameError && <FormValidationMessage>{this.state.usernameError}</FormValidationMessage>}
              {this.state.passwordError && <FormValidationMessage>{this.state.passwordError}</FormValidationMessage>}
              {this.props.error && <FormValidationMessage>{this.props.error}</FormValidationMessage>}
            </Row>
          </Col>
          <Col size={1}></Col>
        </Row>
        <Row size={2}>
          <Col size={2}></Col>
          <Col size={10}>
            <Button
              large
              title='Login'
              icon={{name: 'lock-open', type: 'material', size: 20 }}
              backgroundColor='steelblue'
              onPress={this.login.bind(this)}
              disabled={this.props.loading}
              borderRadius={5}
              containerViewStyle={{ borderRadius: 5 }}
              style={{ paddingTop: 10 }}
            />
          </Col>
          <Col size={2}></Col>
        </Row>
        <Row size={2}>
          <Col size={2}></Col>
          <Col size={5} style={{ paddingLeft: 15, justifyContent: 'center', alignItems: 'flex-start' }}>
            <TouchableHighlight
              onPress={() => { console.log('Remembering password...') }}>
              <Text style={{ color: 'steelblue' }}>Forgot Password</Text>
            </TouchableHighlight>
          </Col>
          <Col size={5} style={{ paddingRight: 15, justifyContent: 'center', alignItems: 'flex-end' }}>
            <TouchableHighlight
              onPress={() => { this.props.changePage('signup') }}>
              <Text style={{ color: 'steelblue' }}>Signup to Play</Text>
            </TouchableHighlight>
          </Col>
          <Col size={2}></Col>
        </Row>
        <Row size={4}>
          <Col size={2}></Col>
          <Col size={5} style={{ alignItems: 'center', paddingRight: 36, paddingTop: 20 }}>
            <Icon
              name='google--with-circle'
              type='entypo'
              color='red'
              size={75}
              onPress={() => console.log('hello')}
            />
          </Col>
          <Col size={6} style={{ alignItems: 'center', paddingRight: 36, paddingTop: 20 }}>
            <Icon
              name='facebook-with-circle'
              type='entypo'
              color='steelblue'
              size={75}
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