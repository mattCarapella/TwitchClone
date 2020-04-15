import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';
import './StreamShow.css';

class StreamShow extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchStream(id);
    this.buildPlayer();
  };

  componentDidUpdate() {
    this.buildPlayer();
  };

  componentWillUnmount() {
    this.player.destroy();
  };

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }
    if (flv.isSupported()) {
      const id = this.props.match.params.id;
      this.player = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${id}.flv`,
        isLive: true
      });
      this.player.attachMediaElement(this.videoRef.current);
      this.player.load();
    }
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>
    }

    return (
      <div className='show-stream__container'>
        <div className='show-stream__video'>
          <video 
            ref={this.videoRef} 
            style={{ width: '100%' }} 
            controls={true} 
            autoPlay={true}
          />
        </div>
        <div className='show-stream__footer'>
          <div className='show-stream__title'>{this.props.stream.title}</div>
          <div className='show-stream__description'>{this.props.stream.description}</div>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);