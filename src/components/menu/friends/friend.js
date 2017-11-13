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
        backgroundColor: '#fff',
        borderTopRightRadius: 80,
        borderBottomRightRadius: 20,
        borderWidth: 3,
        borderColor: this.props.color,
        borderLeftWidth: 0,
        borderTopWidth: 0
      }}>
        <Avatar
          rounded
          width={viewportWidth / 4}
          source={{uri: this.props.image}}
          activeOpacity={0.7}
          onPress={() => { console.log('Loading stats...') }}
          avatarStyle={{ borderColor: this.props.color, borderWidth: 3, borderTopLeftRadius: 0 }}
        />
        <Row size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Icon
            size={24}
            name='message-text'
            type='material-community'
            color={this.props.color}
            style={{ flex: 1, alignItems: 'center', paddingLeft: 5 }}
          />
          <Icon
            size={50}
            name='control-point-duplicate'
            type='material'
            color={this.props.color}
            style={{ flex: 1, alignItems: 'center', paddingRight: 10, paddingBottom: 20 }}
          />
        </Row>
        <Row size={1} style={{ backgroundColor: this.props.color, borderBottomRightRadius: 18, justifyContent: 'center', alignItems: 'center' }}>
          <Icon
            size={14}
            name='circle'
            type='font-awesome'
            color='lightgreen'
          />
          <Text style={{ color: '#fff', fontWeight: 'bold', paddingLeft: 10 }}>{this.props.username ? this.props.username.toUpperCase() : ''}</Text>
        </Row>
      </View>
    );
  }
}

FriendComponent.propTypes = {
  username: PropTypes.string,
  image: PropTypes.string,
  color: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendComponent);