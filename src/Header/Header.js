import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../Header/Header.css'
import { NavLink, Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isLoggedIn = this.props.loggedIn
    return (
      <header className='Header'>
        <nav>
          <NavLink to='/' className='home-link'>Home</NavLink>
          {isLoggedIn &&
            <Link to='/'><button onClick={() => {
              this.props.updateLoginStatus(false)
              this.props.updateUserId(null)
            }}>Log out</button></Link>
          }
          {!isLoggedIn &&
            <Link to='/login'><button>Log in</button></Link>
          }
        </nav>
        <section className="title">
          <h1>Rancid Tomatillos</h1>
        </section>
      </header>
    )
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool
}

export default Header

