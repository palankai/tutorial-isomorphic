import createInject from 'lib/injector';
import PropTypes from 'prop-types';

const contextShape = {
  api: PropTypes.object.isRequired
};

export const { inject, Injector } = createInject(contextShape);
