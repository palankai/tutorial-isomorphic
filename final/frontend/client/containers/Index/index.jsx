import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ExcerptList from 'components/ExcerptList';
import { unloadExcerpts, requestExcerpts } from 'store/actions';


class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      status: null
    };
    this.items = [];
    this.status = null;
    if (this.props.data) {
      this.state = {
        items: this.props.data.items || [],
        status: this.props.data.state || null
      };
    }
  }

  componentWillReceiveProps() {
    this.setState((prevState, props) => ({
      ...prevState,
      status: props.data.state,
      items: props.data.items
    }));
  }

  componentWillMount() {
    if( this.state.status === null ) {
      this.props.onLoad();
    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if( this.state.status == 'loaded' ) {
      return <ExcerptList items={this.state.items}/>;
    }
    return <p>Loading...</p>;
  }

}

Index.propTypes = {
  data: PropTypes.shape({
    items:PropTypes.array
  })
};

const mapDispatchToProps = dispatch => {
  return {
    onUnload: () => {
      dispatch(unloadExcerpts());
    },
    onLoad: () => {
      dispatch(requestExcerpts());
    }
  };
};

const mapStateToProps = state => {
  return {
    data: state.index
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
