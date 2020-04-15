import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './Header.css';
import GoogleAuth from './GoogleAuth';
import { FaPlusCircle } from 'react-icons/fa';

class Header extends Component {

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div className='otherlinks'>
          <Link to='/streams/create'>
            <FaPlusCircle size={30} className='otherlinks__create-icon' />
          </Link>
        </div>
      );
    };
  };

  render() {
    return (
      <div className='headerWrapper'>
        <div className='headerTitle'>
          <Link to='/'>[logo]</Link>
        </div>
        <div className='otherLinks'>
          <div className='otherlinks__link'>{this.renderCreate()}</div>
          <div className='otherlinks__link'></div><Link to='/' className='otherLinks__all-streams'>Browse</Link>
          <GoogleAuth />
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    currUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  }
};

export default connect(mapStateToProps, {})(Header);