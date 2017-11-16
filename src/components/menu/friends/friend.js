import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { View, Text, Image, Dimensions } from 'react-native';
import { Card, ListItem, Button, Avatar, Icon } from 'react-native-elements';
const styles = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    //
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class FriendComponent extends React.Component {
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
      <View style={{
        height: '100%',
        width: 150,
        backgroundColor: '#ddd',
        borderTopRightRadius: 80,
        borderBottomRightRadius: 20,
        borderWidth: 3,
        borderColor: this.props.friend.settings.color,
        borderLeftWidth: 0,
        borderTopWidth: 0
      }}>
        <Avatar
          rounded
          width={viewportWidth / 4}
          source={{uri: this.props.friend.avatarUrl}}
          activeOpacity={0.7}
          onPress={() => { console.log('Loading stats...') }}
          avatarStyle={{ borderColor: this.props.friend.settings.color, borderWidth: 3, borderTopLeftRadius: 0 }}
        />
        <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Icon
            size={24}
            name='message-text'
            type='material-community'
            color='black'
            style={{ flex: 1, alignItems: 'center', paddingLeft: 5 }}
          />
          <Icon
            size={50}
            name='control-point-duplicate'
            type='material'
            color='black'
            style={{ flex: 1, alignItems: 'center', paddingRight: 10, paddingBottom: 20 }}
          />
        </Row>
        <Row size={1} style={{ backgroundColor: this.props.friend.settings.color, borderBottomRightRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
          
          {/* ONLINE INDICATOR */}
          <Icon
            size={14}
            name='circle'
            type='font-awesome'
            color={this.props.friend.online ? 'lightgreen' : 'red'}
          />
          
          <Text style={{ color: '#fff', fontWeight: 'bold', paddingLeft: 10 }}>
            {this.props.friend.username.toUpperCase()}
          </Text>
        </Row>
      </View>
    );
  }
}

FriendComponent.propTypes = {
  friend: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendComponent);