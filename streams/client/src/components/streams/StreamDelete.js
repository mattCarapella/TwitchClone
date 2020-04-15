import React, { Component } from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa';
import './StreamDelete.css';


class StreamDelete extends Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  };

  renderActions() {
    const id = this.props.match.params.id;
    return ( 
      <div className="modal-buttons__container">
        <div className='modal-buttons'>
          <button onClick={() => this.props.deleteStream(id)} className="modal__delete-btn"><FaRegCheckCircle /></button>
          <button onClick={() => history.push('/')} to={'/'} className="modal__edit-btn"><FaRegTimesCircle /></button>
        </div>
      </div>
    );
  };

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Are you sure you want to delete the stream: "${this.props.stream.title}"?`
  };
  
  render() {
    return (
      <Modal 
        title='Warning!'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);