import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardColumn from './board-column';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

const styles = require('../../../styles/containers');

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

class BoardRow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    const columns = [];
    
    for (let i = 0; i < this.props.size; i ++) {
      columns.push(<BoardColumn key={`col-${i + 1}`} rowId={this.props.rowId} colId={i} />);
    }

    return (
      <Row style={{ backgroundColor: this.props.color }}>
        {columns}
      </Row>
    );
  }
}

BoardRow.propTypes = {
  rowId: PropTypes.number,
  key: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardRow);