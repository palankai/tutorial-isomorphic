import React from 'react';
import { shallow } from 'enzyme';

import AboutScene from 'scenes/About';
import Header from 'components/Header';
import AboutContent from 'components/AboutContent';

test('About scene contains Header and Content', () => {
  const scene = shallow(<AboutScene />);

  expect(scene.find(Header)).toHaveLength(1);
  expect(scene.find(AboutContent)).toHaveLength(1);
});
