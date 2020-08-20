import React, { Component } from 'react'
import '../Header/Header.css'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className='Header'>
        <button onClick={this.props.showLogin}>Login</button>
        <h1>Rancid Tomatillos</h1>
      </header>
    )
  }
}

export default Header

