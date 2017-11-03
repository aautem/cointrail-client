import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

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
        {name: 'aautem'},
        {name: 'cdturner'},
        {name: 'kaitheguy'},
        {name: 'billybob'},
        {name: 'chocolaterain'},
        {name: 'timmytwoshoes'},
        {name: 'kipperdom'},
        {name: 'hazyhank'},
      ],
    };
  }

  componentWillMount() {}

  componentWillUnmount() {}

  _renderItem ({item, index}) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{ item.title }</Text>
      </View>
    );
  }

  render() {
    return (
      <Carousel
        ref={(c) => { this._carousel = c }}
        data={this.state.friends}
        renderItem={this._renderItem}
        sliderWidth={100}
        itemWidth={20}
      />
    );
  }
}

FriendsContainer.propTypes = {
  friends: PropTypes.array,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);