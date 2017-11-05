import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as constants from '../../utilities/const';
import { Text } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
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
  }
  
  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Col style={{ backgroundColor: 'lightgrey', justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }}>
        <Row size={1} style={styles.center}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'steelblue' }}>{constants.APP_TITLE}</Text>
        </Row>
        {this.props.page === constants.AUTH_PAGES.LOGIN && <Login />}
        {this.props.page === constants.AUTH_PAGES.SIGNUP && <Signup />}
        {/* this.props.page === constants.AUTH_PAGES.FORGOT_PASSWORD && <ForgotPassword /> */}
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