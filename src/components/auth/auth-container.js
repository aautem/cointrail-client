import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auth0 from 'react-native-auth0';
import * as authActions from '../../store/actions/auth';
import * as constants from '../../utilities/const';
import { Text, ActivityIndicator } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';
const appSS = require('../../styles/app');

function mapStateToProps(state) {
  return {
    config: state.app.config,
    loading: state.auth.loading,
    loaded: state.auth.loaded,
    error: state.auth.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    launchAuth0: authActions.launchAuth0,
    // loginUser: authActions.loginUser,
    // loginError: authActions.loginError,
  }, dispatch);
};

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.config) {
      this.props.launchAuth0(this.props.config);
    }
  }

  // login(user) {
  //   this.props.loginUser(user);
  //   this.setState({ loading: false });
  // }

  // loginError(error) {
  //   this.props.loginError(error);
  //   this.setState({ loading: false });
  // }

  render() {
    // if (this.props.config) {
    //   console.log('*** AUTH CONFIG ***', this.props.config);

    //   this.props.launchAuth0(this.props.config);

      // const auth0 = new Auth0({
      //   domain: this.props.config.auth0Domain,
      //   clientId: this.props.config.auth0Id,
      // });
      // auth0.webAuth.authorize({
      //   scope: 'openid profile email',
      //   audience: 'https://app77626749.auth0.com/userinfo'
      // }).then((res) => {
      //   console.log('*** TOKEN ***', res);

      //   if (res.accessToken) {
      //     auth0.auth.userInfo({ token: res.accessToken }).then((user) => {
      //       console.log('*** USER ***', user);

      //       this.login(user);
      //     });
      //   } else {
      //     this.loginError('No auth token.');
      //   }
      // }).catch((error) => {
      //   console.warn('Authentication error:', error);
        
      //   // this.loginError(error);
      // });
    // }

    if (this.props.loading) {
      return (
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
          <ActivityIndicator animating={true} color='#fff' size='large' />
          <Text style={{ color: '#fff' }}>Loading</Text>
        </Col>
      );
    }

    return (
      <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
        <Text style={{ color: '#fff', paddingBottom: 20 }}>{this.props.error}</Text>
        <Button
          raised
          large
          buttonStyle={{ borderRadius: 5, width: 250 }}
          containerViewStyle={{ borderRadius: 5 }}
          backgroundColor='#eee'
          color='#aaa'
          icon={{ type: 'material', name: 'lock-open', color: '#aaa' }}
          title='Login to Cointrail'
          onPress={() => { this.props.launchAuth0(this.props.config) }}
        />
      </Col>
    );
  }
}

AuthContainer.propTypes = {
  config: PropTypes.object,
  loginUser: PropTypes.func,
  appLoading: PropTypes.bool,
  authLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);