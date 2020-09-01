import React from 'react';
import PropTypes from 'prop-types';
import '../Header/Header.css';
import { NavLink, Link } from 'react-router-dom';

const Header = ({ loggedIn, updateLoginStatus, updateUserId }) => {
  return (
    <header className='Header'>
      <nav>
        <section className='nav-links'>
          <NavLink to='/' className='nav-link' aria-label='Go home'>Home</NavLink>
          {loggedIn &&
            <NavLink to='/favorites' className='nav-link' aria-label="View favorites">Favorites</NavLink>
          }
        </section>
        {loggedIn &&
          <Link to='/'><button onClick={() => {
            updateLoginStatus(false);
            updateUserId(null);
          }}>Log out</button></Link>
        }
        {!loggedIn &&
          <Link to='/login'><button>Log in</button></Link>
        }
      </nav>
      <section className='title'>
        <h1>Rancid Tomatillos</h1>
      </section>
    </header>
  )
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  updateLoginStatus: PropTypes.func,
  updateUserId: PropTypes.func
}

export default Header

