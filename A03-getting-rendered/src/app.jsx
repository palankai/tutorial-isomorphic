import React from 'react';

export const Header = () => (
  <h1>Hello World</h1>
);

export const Content = () => (
  <p>This is my first ReactJS page</p>
);

const App = () => (
  <div>
    <Header />
    <Content />
  </div>
);

export default App;
