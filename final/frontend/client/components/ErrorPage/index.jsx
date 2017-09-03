import React from 'react';
import PropTypes from 'prop-types';


class ErrorPage extends React.Component {

  static contextTypes = {
    router: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  }

  componentWillMount() {
    const { staticContext } = this.context.router;
    if (staticContext) {
      staticContext.status = 404;
    }
  }

  render() {
    return (<p>Page not found</p>);
  }
}

export default ErrorPage;
