import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';
import './StreamCreate.css';
import './formStyles.css';


class StreamCreate extends React.Component {

  onSubmit = (formValues) => {
    this.props.createStream(formValues);
  }

  render() {
    return (
      <div className='stream-create__container'>
        <div className='stream-create__header'>Create your Stream</div>
        <StreamForm parentSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default connect(null, { createStream })(StreamCreate);