import React, { Component } from 'react'
import '../Header/Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isLoggedIn = this.props.loggedIn
    return (
      <header className='Header'>
        {isLoggedIn &&
          <button onClick={() => {
            this.props.updateLoginStatus(false)
            this.props.changeView('homepage')}}>Log out</button>
        }
        {!isLoggedIn &&
          <button onClick={() => { this.props.changeView('login') }}>Log in</button>
        }
        <h1>Rancid Tomatillos</h1>
      </header>
    )
  }
}

export default Header

