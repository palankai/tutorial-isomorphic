import React from 'react';
import {shallow} from 'enzyme';

import AboutScene from '../../src/scenes/About';
import Header from '../../src/components/Header';
import AboutContent from '../../src/components/AboutContent';

test('About scene contains Header and Content', () => {
  const scene = shallow(<AboutScene />);

  expect(scene.find(Header)).toHaveLength(1);
  expect(scene.find(AboutContent)).toHaveLength(1);
});
