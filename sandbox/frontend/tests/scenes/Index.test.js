import React from 'react';
import {shallow} from 'enzyme';

import IndexScene from '../../src/scenes/Index';
import Header from '../../src/components/Header';
import Content from '../../src/components/Content';

test('Index scene contains Header and Content', () => {
  const scene = shallow(<IndexScene />);

  expect(scene.find(Header)).toHaveLength(1);
  expect(scene.find(Content)).toHaveLength(1);
});
