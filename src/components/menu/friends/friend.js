import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'

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
      <Card
        image={{ uri: this.props.image }}
        imageStyle={{ width: 50, height: 50 }}
      >
        <Text>
          {this.props.title}
        </Text>
        <Button
          backgroundColor='lightgrey'
          title='Play'
        />
      </Card>
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