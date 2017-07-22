import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { submitForm } from '../../actions';
import Header from '../../components/Header';


class TextInput extends React.Component {
  static propTypes = {
      name: PropTypes.string.isRequired,
      defaultValue: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onChange = props.onChange;
    this.name = props.name;
    this.defaultValue = props.defaultValue || '';
    this.state = {
      value: this.defaultValue,
      len: this.defaultValue.length
    };
  }

  render() {
    return (
      <span>
        <input
        type="text"
        onChange={e => this.handleChange(e)}
        defaultValue={this.props.default}
        />
        <span>{this.state.len}</span>
      </span>
    );
  }

  handleChange(event) {
    const value = event.target.value;
    this.setState((prevState, props) => ({
      value: value,
      len: value.length
    }));
    this.onChange(value, this.name);
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
    this.default = {
      firstName: props.firstName,
      lastName: props.lastName
    };
    this.state = {
      ...this.default,
      index: 0
    };
  }

  render() {
    return (
        <form onSubmit={e => this.onSubmitHandler(e)} key={this.state.index}>
        <TextInput name="firstName" onChange={(v,n) => this.onChangeControl(n, v)} default={this.default.firstName}/>
        <TextInput name="lastName" onChange={(v,n) => this.onChangeControl(n, v)} default={this.default.lastName}/>
        <input type="submit" />
        <p>{this.state.firstName} + {this.state.lastName}</p>
    </form>
    );
  }

  onSubmitHandler(e) {
    e.preventDefault();
    this.dispatch(submitForm(this.state));
    console.log(this.default);
    this.setState((prevState, props) => ({
      index: prevState.index + 1,
      firstName: '',
      lastName: ''
    }));
  }

  reset() {
  }

  onChangeControl(name, value) {
    this.setState((prevState, props) => ({
      ...prevState,
      [name]: value
    }));
  }

};

Form.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired
};


const mapStateToProps = (state, ownProps) => {
  const formData = state.formData || {};
  return {
    firstName: formData.firstName || '',
    lastName: formData.lastName || ''
  };
};


const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

const FormContainer = connect(
  mapStateToProps//,
  //mapDispatchToProps
)(Form);

const SubmitScene = () => (
  <div>
    <Header />
    <h3>The form</h3>
    <FormContainer />
  </div>
);

export default SubmitScene;
