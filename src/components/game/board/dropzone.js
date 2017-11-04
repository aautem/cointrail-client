import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DropButton from './drop-button';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';

function mapStateToProps(state) {
  return {
    size: state.series.settings.size,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class Dropzone extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.initializeBoard(this.props.size);
  }

  componentWillUnmount() {}

  render() {
    const dropButtons = [];

    for (let i = 0; i < this.props.size; i ++) {
      dropButtons.push(<DropButton key={`drop-btn-${i + 1}`} colId={i} />);
    }

    return (
      <Row size={1.25} style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 5, backgroundColor: '#fff' }}>
        { dropButtons }
      </Row>
    );
  }
}

// Dropzone.propTypes = {
//   board: PropTypes.array,
//   boardPoints: PropTypes.array,
// };

export default connect(mapStateToProps, mapDispatchToProps)(Dropzone);