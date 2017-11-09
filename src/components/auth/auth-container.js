import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auth0 from 'react-native-auth0';
import * as authActions from '../../store/actions/auth';
import * as constants from '../../utilities/const';
import { Text } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
const appSS = require('../../styles/app');

function mapStateToProps(state) {
  return {
    config: state.app.config,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginUser: authActions.loginUser,
  }, dispatch);
};

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.config) {
      const auth0 = new Auth0({
        domain: this.props.config.auth0Domain,
        clientId: this.props.config.auth0Id,
      });
      auth0.webAuth.authorize({
        scope: 'openid profile email',
        audience: 'https://app77626749.auth0.com/userinfo'
      }).then((res) => {
        auth0.auth.userInfo({ token: res.accessToken }).then((user) => {
          this.props.loginUser(user);
        });
      }).catch((error) => {
        console.warn('Authentication error:', error);
      });
    }

    return (
      <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
        <Text style={{ color: '#fff' }}>Please login or sign up to continue</Text>
        {/* Button that reopens the Auth0 lock */}
      </Col>
    );
  }
}

AuthContainer.propTypes = {
  config: PropTypes.object,
  loginUser: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);