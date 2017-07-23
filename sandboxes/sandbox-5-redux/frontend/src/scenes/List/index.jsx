import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';
import { fetchFromServer, unmount } from 'store/actions';
import Header from 'components/Header';

class ComplexListScene extends React.Component {

  constructor(props) {
    super(props);
    if( !props.status ) {
      this.invalidate();
    }
    this.state = {
      items: props.items || [],
      status: props.status || 'invalid'
    };
  }

  componentWillReceiveProps() {
    this.setState((prevState, props) => ({
        ...prevState,
        status: props.status,
        items: props.items
    }));
  }

  componentWillUnmount() {
    this.props.dispatch(unmount());
  }

  render() {
    return (
        <div>
          <Header />
          <p>Simple List of values from server side... {this.state.status}</p>
          <ul>
            {this.state.items.map((item) => (
              <li key={item.id}>#{item.id}: {item.content}</li>
            ))}
          </ul>
          <button onClick={e => this.invalidate()}>Refresh</button>
        </div>
    );
  }

  invalidate() {
    const action = this.props.route.action();
    this.props.dispatch(action);
  }
}

const mapStateToProps = (state, ownProps) => {
  let props = state.listScene || {
    items: []
  };
  return props;
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onInvalid: () => {
      dispatch(fetchFromServer());
    }
  };
};

const ListSceneContainer = withRouter(connect(
  mapStateToProps//,
  //mapDispatchToProps
)(ComplexListScene));

export default ListSceneContainer;
