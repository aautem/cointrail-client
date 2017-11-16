import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as friendsActions from '../../../store/actions/friends';
import * as messagesActions from '../../../store/actions/messages';
import { Dimensions, TextInput, Modal, View, Text, Slider, Switch, ActivityIndicator, TouchableOpacity, TouchableHighlight, Picker, ScrollView } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar, SearchBar, Card } from 'react-native-elements';
import { ColorPicker } from 'react-native-color-picker'

const modalSS = require('../../../styles/modals');
const appSS = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const messages = [
  {fromUsername: 'aautem', message: 'testing the message system for the efficiency of message displayment on small vertical screens that light up in the night.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system.', type: 'friend'},
  {fromUsername: 'aautem', message: 'testing the message system.', type: 'friend'},
  {fromUsername: 'aautem', message: 'testing the message system.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system for the efficiency of message displayment on small vertical screens that light up in the night.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system for the efficiency of message displayment on small vertical screens that light up in the night.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system for the efficiency of message displayment on small vertical screens that light up in the night.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system for the efficiency of message displayment on small vertical screens that light up in the night.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system for the efficiency of message displayment on small vertical screens that light up in the night.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system for the efficiency of message displayment on small vertical screens that light up in the night.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system for the efficiency of message displayment.', type: 'message'},
  {fromUsername: 'aautem', message: 'testing the message system for the efficiency of message displayment on small vertical screens that light up in the night.', type: 'message'},
];

const friends = [
  {username: 'aautem'},
  {username: 'cdturner'},
  {username: 'kaitheguy'},
  {username: 'hazyhank'},
  {username: 'lindylou'},
  {username: 'howdyhey'},
  {username: 'geronimo'},
  {username: 'holaworld'},
  {username: 'coolkeith'},
];

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
    this.state = {
      sendingMessage: false,
      message: '',
      toUsername: null,
    };
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


        {!this.props.loading && !this.state.sendingMessage &&
        <Col size={14/14} style={[appSS.center]}>

          {/* HEADER */}
          <Row size={2/24} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', width: '100%', borderBottomWidth: 2, borderColor: '#aaa' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Messages</Text>
          </Row>

          <Row size={19/24}>
            <ScrollView>

              {/* MAP OVER MESSAGES */}
              {messages.length > 0 &&
              messages.map((message, index) => {
                return (
                  <Card key={`msg-${index}`} title={`${message.fromUsername.toUpperCase()}  |  10:31pm`} titleStyle={{ textAlign: 'left' }} containerStyle={{ marginBottom: 20 }}>
                    <Text style={{ marginBottom: 5 }}>
                      {message.message}
                    </Text>

                    {/* MESSAGE HANDLER BUTTONS */}
                    {message.type === 'message' &&
                    <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                      <Button title='Reply' borderRadius={5} />
                      <Button title='Delete' borderRadius={5} />
                    </Row>}

                    {/* FRIEND REQUEST BUTTONS */}
                    {message.type === 'friend' &&
                    <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                      <Button title='Accept' backgroundColor='green' borderRadius={5} />
                      <Button title='Decline' backgroundColor='red' borderRadius={5} />
                    </Row>}
                  </Card>
                );
              })}

              {/* NO MESSAGES */}
              {!messages.length &&
              <Text style={{ textAlign: 'center', textAlignVertical: 'center'}}>You have no messages.</Text>}

            </ScrollView>
          </Row>

          {/* BUTTONS */}
          <Row size={3/24} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', borderTopWidth: 2, borderColor: '#aaa' }}>
            <Button
              title='Send Message'
              backgroundColor='#ccc'
              borderRadius={5}
              buttonStyle={{ borderWidth: 1, borderColor: '#aaa', width: 150 }}
              textStyle={{ color: 'black', fontWeight: 'bold' }}
              onPress={() => { this.setState({ sendingMessage: true }) }}
            />
            <Button
              title='Main Menu'
              backgroundColor='#ccc'
              borderRadius={5}
              buttonStyle={{ borderWidth: 1, borderColor: '#aaa', width: 150 }}
              textStyle={{ color: 'black', fontWeight: 'bold' }}
              onPress={this.props.closeMessagesModal}
            />
          </Row>

        </Col>}

        {!this.props.loading && this.state.sendingMessage &&
        <Col size={14/14}>

          {/* HEADER */}
          <Row size={2/24} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', width: '100%', borderBottomWidth: 2, borderColor: '#aaa' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Sending Message</Text>
          </Row>
          
          {/* PICKER */}
          <Row size={5/24}>
            <Col size={14/14} style={{ paddingLeft: 20, paddingRight: 20 }}>
              <Text style={{ marginTop: 20 }}>Send to</Text>

              {/* LOOP OVER ALL FRIENDS */}
              <Picker
                style={{ backgroundColor: '#eee', marginTop: 5 }}
                selectedValue={this.state.toUsername}
                onValueChange={(username) => { this.setState({ toUsername: username }) }}
              >
                {[{ username: null }].concat(friends).map((friend) => {
                  if (!friend.username) {
                    return <Picker.Item label='Select a Friend...' value={null} />;
                  }
                  return <Picker.Item label={friend.username} value={friend.username} />;
                })}
              </Picker>
            </Col>
          </Row>

          {/* MESSAGE INPUT */}
          <Row size={14/24}>
            <Col size={14/14} style={[{ paddingLeft: 20, paddingRight: 20 }]}>
              <View
                style={{
                  backgroundColor: '#eee',
                  borderColor: '#aaa',
                  borderWidth: 1,
                  width: '100%',
                  borderRadius: 5,
                }}
              >
                <TextInput
                  height={130}
                  editable={true}
                  maxLength={255}
                  multiline={true}
                  placeholder={`Message body...`}
                  autoGrow={true}
                  style={{ textAlign: 'left', textAlignVertical: 'top' }}
                />
              </View>
            </Col>
          </Row>

          {/* ACTION BUTTONS */}
          {/* BUTTONS */}
          <Row size={3/24} style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', borderTopWidth: 2, borderColor: '#aaa' }}>
            <Button
              title='Send'
              backgroundColor='#ccc'
              borderRadius={5}
              buttonStyle={{ borderWidth: 1, borderColor: '#aaa', width: 150 }}
              textStyle={{ color: 'black', fontWeight: 'bold' }}
              onPress={() => { alert('Sending message...') }}
            />
            <Button
              title='Back'
              backgroundColor='#ccc'
              borderRadius={5}
              buttonStyle={{ borderWidth: 1, borderColor: '#aaa', width: 150 }}
              textStyle={{ color: 'black', fontWeight: 'bold' }}
              onPress={() => { this.setState({ sendingMessage: false }) }}
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