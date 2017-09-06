import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExcerptList from 'components/ExcerptList';


class Index extends React.Component {

  render() {
    return <ExcerptList items={this.props.data.items}/>;
  }

}

Index.propTypes = {
  data: PropTypes.shape({
    items:PropTypes.array
  })
};

export default connect(
  state => ({
    data: state.index
  })
)(Index);
