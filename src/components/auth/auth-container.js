import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import Signup from './signup';
import Login from './login';

const styles = require('../../styles/app');

function mapStateToProps(state) {
  return {
    page: state.auth.page,
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
      //
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Col style={{ backgroundColor: 'lightgrey', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <Row size={1} style={styles.center}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'steelblue' }}>.~::  C O N T R A I L  ::~.</Text>
        </Row>
        {this.props.page === 'signup' && <Signup />}
        {this.props.page === 'login' && <Login />}
      </Col>
    );
  }
}

AuthContainer.propTypes = {
  page: PropTypes.string,
  loading: PropTypes.bool,
  authenticated: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);