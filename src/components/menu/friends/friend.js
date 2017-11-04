import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { View, Text, Image } from 'react-native';
import { Card, ListItem, Button, Avatar, Icon } from 'react-native-elements';
const styles = require('../../../styles/app');

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
      <View style={{ height: '100%', width: 130, padding: 5, backgroundColor: '#fff' }}>
        <Avatar
          large
          rounded
          source={{uri: this.props.image}}
          activeOpacity={0.7}
          containerStyle={{ marginLeft: 20 }}
          onPress={() => { console.log('Loading stats...') }}
        />
        <Row size={1} style={styles.center}>
          <Icon
            size={10}
            name='circle'
            type='font-awesome'
            color='lightgreen'
          />
          <Text style={{ marginLeft: 5 }}>{this.props.title}</Text>
        </Row>
        <Row size={3} style={styles.center}>
          <Icon
            size={30}
            name='play-circle'
            type='font-awesome'
            color='steelblue'
            containerStyle={{ paddingLeft: 10, paddingRight: 10 }}
          />
          <Icon
            size={30}
            name='message-text-outline'
            type='material-community'
            color='steelblue'
            containerStyle={{ paddingLeft: 10, paddingRight: 10 }}
          />
        </Row>
      </View>

      // <Card
      //   image={{ uri: this.props.image }}
      //   imageStyle={{ width: 50, height: 50 }}
      // >
      //   <Text>
      //     {this.props.title}
      //   </Text>
      //   <Button
      //     backgroundColor='lightgrey'
      //     title='Play'
      //   />
      // </Card>
    );
  }
}

// FriendsContainer.propTypes = {
//   friends: PropTypes.array,
//   loading: PropTypes.bool,
//   loaded: PropTypes.bool,
//   error: PropTypes.string,
// };

export default connect(mapStateToProps, mapDispatchToProps)(FriendComponent);