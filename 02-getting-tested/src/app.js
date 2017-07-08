var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
    render: function () {
        return (
            <div>
              <h1>Hello World</h1>
              <p>This is my first ReactJS page</p>
            </div>
        );
    }
});

ReactDOM.render(<App/>,  document.getElementById("app"));
