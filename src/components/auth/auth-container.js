import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Auth0 from 'react-native-auth0';
import Signup from './signup';

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
    //
  }, dispatch);
};

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'signup', // login / signup / forgot-password
      email: null,
      username: null,
      password: null,
      confirmPassword: null,
      auth0: null,
    };
  }

  componentWillMount() {
    const clientId = 'z2xIFUI0P4OLA4S_uJ2CADCe3A2AKsH5';
    const domain = 'app77626749.auth0.com';
    const auth0 = new Auth0({ domain: domain, clientId: clientId });

    this.setState({ auth0: auth0 });

    // const params = {
    //   username: 'aautem',
    //   password: 'test1234',
    //   realm: 'Username-Password-Authentication',
    //   // realm: google-oauth2,
    //   // realm: facebook,
    // };

    // // returns an auth token
    // auth0.auth.passwordRealm(params).then((token) => {
    //   auth0.auth.userInfo({ token: token.accessToken }).then((user) => {
    //     console.log('*** USER ***', user);

    //     // response = {
    //     //   "email": "autem.alex@gmail.com",
    //     //   "emailVerified": true,
    //     //   "name": "autem.alex@gmail.com",
    //     //   "nickname": "aautem",
    //     //   "picture": "https://s.gravatar.com/avatar/ed70ccead677f6d59ba3edac7d3acb64?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fau.png",
    //     //   "sub": "auth0|59fe6a116be939112c29137d",
    //     //   "updatedAt": "2017-11-05T02:19:16.652Z",
    //     // };

    //   });

    // }).catch((e) => {
    //   console.log('*** AUTH ERROR ***', e);
    // });
  }

  componentWillUnmount() {}

  render() {
    return (
      <Col style={{ backgroundColor: 'lightgrey', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <Row size={1} style={styles.center}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'steelblue' }}>.~::  C O N T R A I L  ::~.</Text>
        </Row>
        {this.state.page === 'signup' && <Signup auth0={this.state.auth0} />}
      </Col>
    );
  }
}

AuthContainer.propTypes = {
  //
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);