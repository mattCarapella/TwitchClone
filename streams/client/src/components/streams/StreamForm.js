import React, { Component, Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import './formStyles.css';

class StreamForm extends Component {
  renderError(meta) {
    if(meta.touched && meta.error) {
      return (
        <div className="err__msg">{meta.error}</div>
      );
    };
  };

  renderInputBox = ({input, label, meta}) => {
    return (
      <Fragment>
        <label>{label}</label>
        { label === 'Title' ?
          <input {...input} className='input-field' /> :
          <textarea {...input} className='input-field' rows={10} />
        }
        {this.renderError(meta)}
      </Fragment>
    );
    
    // if (label === 'Title') {
    //   return (
    //     <Fragment>
    //       <label>{label}</label>
    //       <input {...input} className='input-field' />
    //       {this.renderError(meta)}
    //     </Fragment>
    //   );
    // }
    // else {
    //   return (
    //     <Fragment>
    //       <label>{label}</label>
    //       <textarea {...input} className='input-field' rows={10} />
    //       {this.renderError(meta)}
    //     </Fragment>
    //   );
    // }
  };

  onSubmitForm = (formValues) => {
    this.props.parentSubmit(formValues);
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

export default reduxForm({ form: 'streamForm', validate })(StreamForm);