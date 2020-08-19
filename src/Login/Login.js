import React, { Component } from 'react'
import './Login.css'

class Login extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <form className='Login'>
        <input 
          type='email'
          placeholder='Email address'
          name='email'
          value={this.state.email}
          onChange={this.updateUserLogin}/>
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={this.state.password}
          onChange={this.updateUserLogin}/>
        <button
          onClick={this.validateLogin}
          >Log in
        </button>
      </form>
    )
  }

}


export default Login