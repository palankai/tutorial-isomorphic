import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Excerpt = ({id, title, excerpt}) => (
  <article className="Adr">
    <header>
      <h2 className="Adr-title"><Link to={'/view/' + id}>{title}</Link></h2>
      <p className="Adr-meta"><Link className="app-adr-code" to={'/view/' + id}>{id}</Link> January 1, 2014 by <a href="#">Mark</a></p>
    </header>
    <section>
      <p>{excerpt}</p>
    </section>
    <footer>
      <Link to={`/view/${id}`}>Read more</Link>
    </footer>
  </article>
);

Excerpt.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  excerpt: PropTypes.string
};

export default Excerpt;
