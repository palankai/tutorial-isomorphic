import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Content = ({text}) => (
  <div>
    <p>This is my first ReactJS page</p>
    <p>{text}</p>
  </div>
);

Content.propTypes = {
  text: PropTypes.string.isRequired
};


const mapStateToProps = (state, ownProps) => {
  return {
    text: state.content || 'nada'
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};


const ContentWithText = connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);

export default ContentWithText;
