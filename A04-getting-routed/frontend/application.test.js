import React from 'react';
import {shallow} from 'enzyme';

import App from './src/app.jsx';
import { Header, Content } from './src/app.jsx';

test('App contains Header and Content', () => {
  const app = shallow(<App />);

  expect(app.find(Header)).toHaveLength(1);
  expect(app.find(Content)).toHaveLength(1);
});
