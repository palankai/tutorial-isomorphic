import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExcerptList from 'components/ExcerptList';


class Index extends React.Component {

  constructor(props) {
    super(props);
    this.items = [];
    if (this.props.data) {
      this.items = this.props.data.items;
    }
  }

  render() {
    return <ExcerptList items={this.items}/>;
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
