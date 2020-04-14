import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import './formStyles.css';

class StreamCreate extends Component {
  
  renderError(meta) {
    if(meta.touched && meta.error) {
      return (
        <div className="err__msg">{meta.error}</div>
      );
    }
  }

  renderInputBox = ({input, label, meta}) => {
    return (
      <Fragment>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </Fragment>
    )
  }

  onSubmitForm = (formValues) => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmitForm)} className='ui__form'>
        <Field name='title' label='Title' component={this.renderInputBox} />
        <Field name='description' label='Description' component={this.renderInputBox} />
        <button>Submit</button>
      </form>
    );
  };
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'Title is required.';
  }
  if (!formValues.description) {
    errors.description = 'Description is required.';
  }
  return errors;
}

const formWrapped = reduxForm({
  form: 'streamCreate',
  validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);