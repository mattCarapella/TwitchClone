import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className='headerWrapper'>
      <div className='headerTitle'>
        <Link to='/'>twitchd</Link>
      </div>
      <div className='otherLinks'>
        <Link to='/' className='otherLinks__all-streams'>Streams</Link>
        <GoogleAuth />
      </div>
    </div>
  );
};

export default Header;