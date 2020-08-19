import React, { Component } from 'react'
import '../Header/Header.css'

class Header extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <header className='Header'>
        <button>Login</button>
        <h1>Rancid Tomatillos</h1>
      </header>
    )
  }
}

export default Header

