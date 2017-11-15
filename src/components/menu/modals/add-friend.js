import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as friendsActions from '../../../store/actions/friends';
import { Dimensions, Modal, View, Text, Slider, Switch, ActivityIndicator, TouchableOpacity, TouchableHighlight, Picker } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar, SearchBar } from 'react-native-elements';
import { ColorPicker } from 'react-native-color-picker'

const modalSS = require('../../../styles/modals');
const appSS = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    showModal: state.friends.showAddFriendModal,
    loading: state.friends.loading,
    loaded: state.friends.loaded,
    error: state.friends.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendFriendRequest: friendsActions.sendFriendRequest,
    closeAddFriendModal: friendsActions.closeAddFriendModal,
  }, dispatch);
};

class AddFriendModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentWillUnmount() {
    this.setState({ username: '' });
    // CLEAR ERRORS FROM FRIENDS STATE
  }

  sendFriendRequest() {
    if (this.state.username) {
      this.props.sendFriendRequest(this.state.username);
    }
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={this.props.closeAddFriendModal}
      >
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }]}>
          <SearchBar
            onChangeText={(text) => { this.setState({ username: text }) }}
            onClearText={() => { this.setState({ username: '' }) }}
            lightTheme
            placeholder='username'
            containerStyle={{ width: '100%' }}
          />
          {this.props.error &&
          <Text style={{ color: 'red' }}>{this.props.error}</Text>}
          <Button
            title='Send Request'
            loading={this.props.loading}
            onPress={this.sendFriendRequest.bind(this)}
            containerViewStyle={{ borderRadius: 5, width: '100%', paddingTop: 50 }}
            buttonStyle={{ borderRadius: 5 }}
          />
          <Button
            title='Cancel'
            onPress={this.props.closeAddFriendModal}
            containerViewStyle={{ borderRadius: 5, width: '100%', paddingTop: 5 }}
            buttonStyle={{ borderRadius: 5 }}
          />
        </Col>
      </Modal>
    );
  }
}

AddFriendModal.propTypes = {
  showModal: PropTypes.bool,
  closeAddFriendModal: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendModal);