import React from 'react';
import {shallow} from 'enzyme';

import App from '../src/app.jsx';
import IndexScene from '../src/scenes/Index';

test('App contains IndexScene', () => {
  const app = shallow(<App />);

  expect(app.find(IndexScene)).toHaveLength(1);
});
