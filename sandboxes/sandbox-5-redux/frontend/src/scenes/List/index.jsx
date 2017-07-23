import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import PropTypes from 'prop-types';
import { unmount } from 'store/actions';
import Header from 'components/Header';
import { Button, Glyphicon } from 'react-bootstrap';

class ComplexListScene extends React.Component {
  constructor(props) {
    super(props);
    if (!props.status) {
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
          {this.state.items.map(item => (
            <li key={item.id}>#{item.id}: {item.content}</li>
          ))}
        </ul>
        <Button bsStyle="primary">
          <Glyphicon glyph="star" />
          Primary
        </Button>
        <button className="btn btn-default" onClick={e => this.invalidate()}>Refresh</button>
      </div>
    );
  }

  invalidate() {
    const action = this.props.route.action();
    this.props.dispatch(action);
  }
}

ComplexListScene.propTypes = {
  status: PropTypes.string,
  items: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const props = state.listScene || {
    items: []
  };
  return props;
};

/*
const mapDispatchToProps = (dispatch, ownProps) => ({
  onInvalid: () => {
    dispatch(fetchFromServer());
  }
});
*/

const ListSceneContainer = withRouter(connect(
  mapStateToProps// ,
  // mapDispatchToProps
)(ComplexListScene));

export default ListSceneContainer;
