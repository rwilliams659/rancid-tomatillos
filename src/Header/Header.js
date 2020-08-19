import React, { Component } from 'react'
import '../Header/Header.css'

class Header extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <header className='Header'>
        <h1>Rancid Tomatillos</h1>
        <button>Login</button>
      </header>
    )
  }
}

export default Header

