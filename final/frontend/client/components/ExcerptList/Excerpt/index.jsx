import React from 'react';
import { Link } from 'react-router-dom';

const Excerpt = () => (
  <article className="Adr">
    <header>
      <h2 className="Adr-title"><Link to="/view">Sample decision</Link></h2>
      <p className="Adr-meta"><Link className="app-adr-code" to="/view">ADR-0001</Link> January 1, 2014 by <a href="#">Mark</a></p>
    </header>
    <section>
      <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
    </section>
    <footer>
      <Link to="/view">Read more</Link>
    </footer>
  </article>
);

export default Excerpt;
