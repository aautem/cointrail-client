import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { View, Text, Dimensions } from 'react-native';
import { Header, Button } from 'react-native-elements';
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
        {name: 'aautem', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583},
        {name: 'cdturner', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583},
        {name: 'kaitheguy', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583},
        {name: 'billybob', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583},
        {name: 'chocolaterain', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583},
        {name: 'timmytwoshoes', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583},
        {name: 'kipperdom', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg', points: 583},
        {name: 'hazyhank', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg', points: 583},
      ],
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  renderItem ({item, index}) {
    return (
      <FriendComponent title={item.name} image={item.avatar} text={item.points} />
    );
  }

  render() {
    return (
      <Col size={14/14} style={{paddingTop: 15, paddingBottom: 30}}>
        <Text style={{ color: 'grey', fontWeight: 'bold', paddingLeft: 10 }}>
          Friends
        </Text>
        <Carousel
          ref={(c) => { this._carousel = c }}
          data={this.state.friends}
          renderItem={this.renderItem}
          sliderWidth={viewportWidth}
          itemWidth={130}
          activeSlideAlignment='start'
          inactiveSlideOpacity={0.6}
          inactiveSlideScale={0.9}
        />
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