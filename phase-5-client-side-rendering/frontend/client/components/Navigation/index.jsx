import React from 'react';
import { NavLink } from 'react-router-dom';


const Navigation = () => (
  <nav className="navbar navbar-inverse navbar-static-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="/">ADR database</a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li><NavLink to="/" activeClassName="active" exact>Home</NavLink></li>
          <li><NavLink to="/submit" activeClassName="active" exact>Submit</NavLink></li>
        </ul>
        <form className="navbar-form navbar-right" action="index">
          <div className="input-group">
            <input type="text" name="byText" className="form-control" placeholder="Search..." />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">
                <span className="glyphicon glyphicon-search" aria-hidden="true" />
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  </nav>
);

export default Navigation;
