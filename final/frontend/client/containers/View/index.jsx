import React from 'react';

import Sidebar from '../../components/Sidebar';
import Navigation from 'components/Navigation';


const View = () => (
  <div>
    <Navigation active="view" />

    <div className="container">
      <div className="row">
        <div className="col-sm-8">
          <article className="Adr">
            <div className="well well-sm clearfix">
                <a href="/submit" className="btn btn-primary btn-xs pull-right"><span className="glyphicon glyphicon-remove"></span> Edit</a>
                <a href="/" className="btn btn-success btn-xs"><span className="glyphicon glyphicon-ok"></span> Approve</a>
                <a href="/" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-pencil"></span> Reject</a>
            </div>
            <header>
              <h1 className="Adr-title">Sample decision</h1>
              <p className="Adr-meta"><span>ADR-0001</span> January 1, 2014 by <a href="#">Mark</a> </p>
            </header>
            <section>
                <h2>Excerpt</h2>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            </section>
            <section>
                <h2>Context</h2>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            </section>
            <section>
                <h2>Conclusion</h2>
                <p>Cum sociis natoque penatibus et magnis nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
            </section>
          </article>
            <div className="well well-sm clearfix">
                <a href="/submit" className="btn btn-primary btn-xs pull-right"><span className="glyphicon glyphicon-remove"></span> Edit</a>
                <a href="/" className="btn btn-success btn-xs"><span className="glyphicon glyphicon-ok"></span> Approve</a>
                <a href="/" className="btn btn-danger btn-xs"><span className="glyphicon glyphicon-pencil"></span> Reject</a>
            </div>
        </div>

        <aside className="col-sm-3 col-sm-offset-1">
          <Sidebar />
        </aside>

      </div>

    </div>
  </div>
);

export default View;
