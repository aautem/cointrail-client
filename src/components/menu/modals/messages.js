import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as friendsActions from '../../../store/actions/friends';
import * as messagesActions from '../../../store/actions/messages';
import { Dimensions, Modal, View, Text, Slider, Switch, ActivityIndicator, TouchableOpacity, TouchableHighlight, Picker, ScrollView } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar, SearchBar } from 'react-native-elements';
import { ColorPicker } from 'react-native-color-picker'

const modalSS = require('../../../styles/modals');
const appSS = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    messages: state.messages.data,
    showModal: state.messages.showMessagesModal,
    loading: state.messages.loading,
    loaded: state.messages.loaded,
    error: state.messages.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    acceptFriendRequest: friendsActions.acceptFriendRequest,
    declineFriendRequest: friendsActions.declineFriendRequest,
    closeMessagesModal: messagesActions.closeMessagesModal,
  }, dispatch);
};

class MessagesModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={this.props.closeMessagesModal}
      >

        {this.props.loading &&
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
          <ActivityIndicator animating={true} color='#fff' size='large' />
          <Text style={{ color: '#fff' }}>Loading</Text>
        </Col>}


        {!this.props.loading &&
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }]}>

          {/* HEADER */}
          <Row size={2/24} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Messages</Text>
          </Row>

          <Row size={19/24}>
            <ScrollView style={{ backgroundColor: '#aaa', paddingLeft: 20, paddingRight: 20, paddingTop: 10 }}>

              {/* MAP OVER MESSAGES */}
              {this.props.messages.length > 0 &&
              this.props.messages.map((message, index) => {
                return (
                  <Row key={`msg-${index}-from-${message.fromUserId}`} style={{ backgroundColor: '#eee', padding: 10, marginBottom: 20, borderRadius: 5 }}>
                    <Col size={1}>
                      <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'black' }}>{message.fromUsername.toUpperCase()}</Text>
                      <Text>{message.message}</Text>

                      {message.type === 'friend' &&
                      <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                        <Button
                          title='Accept'
                          backgroundColor='green'
                          borderRadius={5}
                          onPress={() => { this.props.acceptFriendRequest(message) }}
                        />
                        <Button
                          title='Decline'
                          backgroundColor='red'
                          borderRadius={5}
                          onPress={() => { this.props.declineFriendRequest(message) }}
                        />
                      </Row>}
                    </Col>
                  </Row>
                );
              })}

              {/* NO MESSAGES */}
              {!this.props.messages.length &&
              <Text>You have no messages.</Text>}

            </ScrollView>
          </Row>

          {/* HEADER */}
          <Row size={3/24} style={{ justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Button
              title='Menu'
              backgroundColor='#eee'
              borderRadius={5}
              buttonStyle={{ width: '100%' }}
              textStyle={{ color: 'black', fontWeight: 'bold' }}
              onPress={this.props.closeMessagesModal}
            />
          </Row>

        </Col>}
      </Modal>
    );
  }
}

MessagesModal.propTypes = {
  showModal: PropTypes.bool,
  acceptFriendRequest: PropTypes.func,
  declineFriendRequest: PropTypes.func,
  closeMessagesModal: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesModal);