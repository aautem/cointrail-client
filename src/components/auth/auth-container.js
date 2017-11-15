import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Auth0 from 'react-native-auth0';
import * as authActions from '../../store/actions/auth';
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
  }, dispatch);
};

class AuthContainer extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.config) {
      this.props.launchAuth0(this.props.config);
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
          <ActivityIndicator animating={true} color='#fff' size='large' />
          <Text style={{ color: '#fff' }}>Loading</Text>
        </Col>
      );
    }

    if (this.props.error) {
      return (
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
          <Text style={{ color: 'red' }}>{this.props.error}</Text>
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
  launchAuth0: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);