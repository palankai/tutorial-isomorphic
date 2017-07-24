import React from 'react';
import PropTypes from 'prop-types';


export default function createInjector(contextShape) {
  const keys = Object.keys(contextShape);

  class Injector extends React.Component {
    getChildContext() {
      return this.childContext;
    }

    constructor(props, context) {
      super(props, context);
      this.childContext = {};
      keys.map((key) => {
        this.childContext[key] = this.props[key];
        return null;
      });
    }

    render() {
      return React.Children.only(this.props.children);
    }
  }

  Injector.propTypes = {
    ...contextShape,
    children: PropTypes.element.isRequired
  };

  Injector.childContextTypes = contextShape;

  function inject(Component) {
    class Inject extends React.Component {
      constructor(props, context) {
        super(props, context);
        this.childProps = {};
        keys.map((key) => {
          this.childProps[key] = context[key];
          return null;
        });
        this.child = React.cloneElement(
          Component,
          { ...this.childProps, ...props }
        );
      }

      render() {
        return (<Component {...this.childProps} {...this.props} />);
      }
    }

    Inject.contextTypes = contextShape;
    Inject.PropTypes = {
      children: PropTypes.element.isRequired
    };
    keys.map((key) => {
      Inject.PropTypes[key] = contextShape[key].bind(null, false);
    });

    return Inject;
  }

  return {
    inject,
    Injector
  };
}
