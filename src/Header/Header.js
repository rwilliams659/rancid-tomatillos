import React, { Component } from 'react'
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
        <NavLink to='/' className='nav'>Home</NavLink>
        {isLoggedIn &&
          <Link to='/'><button onClick={() => {
            this.props.updateLoginStatus(false)
            this.props.updateUserId(null)
          this.props.changeView('homepage')
        }}>Log out</button></Link>
        }
        {!isLoggedIn &&
          <Link to='/login'><button onClick={() => { this.props.changeView('login') }}>Log in</button></Link>
        }
        <h1>Rancid Tomatillos</h1>
      </header>
    )
  }
}

export default Header

