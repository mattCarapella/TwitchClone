import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';
import './StreamList.css';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

class StreamList extends Component {
  
  componentDidMount() {
    this.props.fetchStreams();
  };

  renderAdmin(stream) {
    if (stream.userId === this.props.currUserId) {
      return (
        <div className='item__preview--buttons'>
          <Link 
            to={`/streams/edit/${stream.id}`} 
            className='edit-btn link-btn'
          >
            <FaPencilAlt className='btn-icon' size={20} />
          </Link>
          <Link 
            to={`/streams/delete/${stream.id}`} 
            className='delete-btn link-btn'
          >
            <FaTrashAlt className='btn-icon' size={20} /> 
          </Link>
        </div>
      );
    };
  };

  renderList() {
    return this.props.streams.map(stream => {
      return (
        <Link to={`/streams/${stream.id}`} className='item__link'>
          <div className='item' key={stream.id}>
            <div className='item__preview'>
              {this.renderAdmin(stream)}
              <div className='item__preview--dummy-text'>
                [NO PREVIEW]
              </div>
            </div>
            <div className='item__footer'>
              <Link to={`/streams/${stream.id}`} className='item__footer--title'>
                {stream.title.substring(0, 75)}{stream.title.length > 75 ? '...' : ''}
              </Link>
              <div className='item__footer--description'>
                {stream.description.substring(0, 150)}{stream.description.length > 150 ? '...' : ''}
              </div>      
            </div>
          </div>
        </Link>
      );
    });
  };

  render() {
    return (
      <div className='stream-list__container'>
        <div className='stream-list__header'>Browse</div> 
        <div className='list__container'>{this.renderList()}</div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return { 
    streams: Object.values(state.streams),
    currUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);
