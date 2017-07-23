import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import App from 'app';
import IndexScene from 'scenes/Index';
import AboutScene from 'scenes/About';

test('App contains IndexScene', () => {
  const app = mount(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(app.find(IndexScene)).toHaveLength(1);
});

test('App contains AboutScene on /about', () => {
  const app = mount(
    <MemoryRouter initialEntries={['/about']}>
      <App />
    </MemoryRouter>
  );

  expect(app.find(AboutScene)).toHaveLength(1);
});
