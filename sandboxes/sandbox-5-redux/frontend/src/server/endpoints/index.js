import configureBackend from './backend';
import configureFrontend from './frontend';

export default (app, config) => {
  configureBackend(app, config);
  configureFrontend(app, config);
};
