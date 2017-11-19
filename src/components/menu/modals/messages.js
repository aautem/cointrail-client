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

function mapStateToProps(state) {
  return {
    user: state.user,
    messages: state.messages.data,
    friends: state.friends.data,
    showModal: state.messages.showMessagesModal,
    loading: state.messages.loading,
    loaded: state.messages.loaded,
    error: state.messages.error,

    sendingMessage: state.messages.sendingMessage,
    replying: state.messages.replying,
    message: state.messages.message,
    toUsername: state.messages.toUsername,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    acceptFriendRequest: friendsActions.acceptFriendRequest,
    sendMessage: messagesActions.sendMessage,
    deleteMessage: messagesActions.deleteMessage,
    setRecipient: messagesActions.setRecipient,
    setMessage: messagesActions.setMessage,
    setSending: messagesActions.setSending,
    setReplying: messagesActions.setReplying,
    resetMessage: messagesActions.resetMessage,
    closeMessagesModal: messagesActions.closeMessagesModal,
  }, dispatch);
};

class MessagesModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //
    };
  }

  sendMessage() {
    if (this.props.sendingMessage && this.props.message && this.props.toUsername) {
      const message = {
        toUsername: this.props.toUsername,
        fromUserId: this.props.user._id,
        fromUsername: this.props.user.username,
        type: 'message',
        message: this.props.message,
      };
      this.props.sendMessage(message);
      this.props.resetMessage();
    } else {
      alert('Must have a recipient and body.');
    }
  }

  render() {
    const friends = this.props.friends.slice();
    const recipientOptions = [{ username: null }].concat(friends);

    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={this.props.closeMessagesModal}
      >

        {this.props.loading &&
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#aaa' }]}>
          <ActivityIndicator animating={true} color='#322893' size='large' />
          <Text style={{ color: '#fff' }}>Loading</Text>
        </Col>}


        {!this.props.loading && !this.props.sendingMessage &&
        <Col size={14/14} style={[appSS.center]}>

          {/* HEADER */}
          <Row size={2/24} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee', width: '100%', borderBottomWidth: 2, borderColor: '#aaa' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Messages</Text>
          </Row>

          <Row size={19/24}>
            <ScrollView>

              {/* MAP OVER MESSAGES */}
              {this.props.messages.length > 0 &&
              this.props.messages.map((message, index) => {
                return (
                  <Card key={`msg-${index}`} title={`${message.fromUsername.toUpperCase()}  |  ${new Date(message.timestamp).toDateString()}`} titleStyle={{ textAlign: 'left' }} containerStyle={{ marginBottom: 20 }}>
                    <Text style={{ marginBottom: 5 }}>
                      {message.message}
                    </Text>

                    {/* REPLY/DELETE BUTTONS */}
                    {message.type === 'message' &&
                    <Row style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 5 }}>
                      <Button
                        title='Reply'
                        borderRadius={5}
                        onPress={() => {
                          this.props.setRecipient(message.fromUsername);
                          this.props.setReplying(true);
                          this.props.setSending(true);
                        }}
                      />
                      <Button
                        title='Delete'
                        borderRadius={5}
                        onPress={() => { this.props.deleteMessage(message._id) }}
                      />
                    </Row>}

                    {/* FRIEND REQUEST BUTTONS */}
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
                        onPress={() => { this.props.deleteMessage(message._id) }}
                      />
                    </Row>}
                  </Card>
                );
              })}

              {/* NO MESSAGES */}
              {!this.props.messages.length &&
              <Text style={{ textAlign: 'center', paddingTop: 10 }}>You have no messages.</Text>}

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
              onPress={() => { this.props.setSending(true) }}
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

        {!this.props.loading && this.props.sendingMessage &&
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
              {!this.props.replying &&
              <Picker
                style={{ backgroundColor: '#eee', marginTop: 5 }}
                selectedValue={this.props.toUsername}
                onValueChange={(username) => { this.props.setRecipient(username) }}
              >
                {recipientOptions.map((friend) => {
                  if (!friend.username) {
                    return <Picker.Item key={`friend-select`} label='Select a Friend...' value={null} />;
                  }
                  return <Picker.Item key={friend.username} label={friend.username} value={friend.username} />;
                })}
              </Picker>}

              {/* REPLYING TO FRIEND */}
              {this.props.replying &&
              <Picker
                style={{ backgroundColor: '#eee', marginTop: 5 }}
                selectedValue={this.props.toUsername}
              >
                <Picker.Item label={this.props.toUsername} value={this.props.toUsername} />
              </Picker>}

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
                  autoCorrect={false}
                  style={{ textAlign: 'left', textAlignVertical: 'top' }}
                  onChangeText={(text) => { this.props.setMessage(text) }}
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
              onPress={this.sendMessage.bind(this)}
            />
            <Button
              title='Back'
              backgroundColor='#ccc'
              borderRadius={5}
              buttonStyle={{ borderWidth: 1, borderColor: '#aaa', width: 150 }}
              textStyle={{ color: 'black', fontWeight: 'bold' }}
              onPress={() => { this.props.resetMessage() }}
            />
          </Row>

        </Col>}

      </Modal>
    );
  }
}

MessagesModal.propTypes = {
  showModal: PropTypes.bool,
  sendMessage: PropTypes.func,
  acceptFriendRequest: PropTypes.func,
  closeMessagesModal: PropTypes.func,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagesModal);