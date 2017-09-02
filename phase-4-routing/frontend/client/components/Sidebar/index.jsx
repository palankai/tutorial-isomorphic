import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ children }) => (
  <aside>
    {children}
  </aside>
);

Sidebar.propTypes = {
  children: PropTypes.arrayOf(PropTypes.Element).isRequired
};

export default Sidebar;
