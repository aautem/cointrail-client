import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { View, Text, Dimensions } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import FriendComponent from './friend';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    friends: state.friends.data,
    loading: state.friends.loading,
    loaded: state.friends.loaded,
    error: state.friends.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class FriendsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      friends: [
        {name: 'aautem', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583, color: 'green'},
        {name: 'cdturner', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583, color: 'purple'},
        {name: 'kaitheguy', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583, color: 'red'},
        {name: 'billybob', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583, color: 'powderblue'},
        {name: 'chocolaterain', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583, color: 'grey'},
        {name: 'timmytwoshoes', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583, color: 'pink'},
        {name: 'kipperdom', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583, color: 'steelblue'},
        {name: 'hazyhank', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583, color: 'lime'},
      ],
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  renderItem ({item, index}) {
    return (
      <FriendComponent title={item.name} image={item.avatar} text={item.points} color={item.color} />
    );
  }

  render() {
    return (
      <Col size={14/14}>
        <Row size={2/10}>
          <Col size={6/14} style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <Text style={{ color: '#aaa', fontWeight: 'bold', paddingLeft: 10 }}>
              Friends Online: 3/12
            </Text>
          </Col>
          <Col size={8/14}>
            <Row size={2/2} style={{ justifyContent: 'flex-end', alignItems: 'center', paddingRight: 10, backgroundColor: '#fff', borderBottomLeftRadius: 50, borderColor: '#aaa', borderWidth: 1 }}>
              <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 20, paddingRight: 10 }}>AAUTEM</Text>
              <Icon
                size={24}
                name='account-circle'
                type='material'
                color='black'
                style={{ paddingRight: 5 }}
                onPress={() => { console.log('Getting help...') }}
              />
              <Icon
                size={24}
                name='settings'
                type='material'
                color='black'
                onPress={() => { console.log('Getting help...') }}
              />
            </Row>
          </Col>
        </Row>
        <Row size={8/10}>
          <Carousel
            ref={(c) => { this._carousel = c }}
            data={this.state.friends}
            renderItem={this.renderItem}
            sliderWidth={viewportWidth}
            itemWidth={150}
            activeSlideAlignment='start'
            inactiveSlideOpacity={0.60}
            inactiveSlideScale={0.80}
          />
        </Row>
      </Col>
    );
  }
}

FriendsContainer.propTypes = {
  friends: PropTypes.array,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);