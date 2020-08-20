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
        <button className='login-form-btn'
          onClick={this.validateLogin}
          >Log in
        </button>
      </form>
    )
  }

  updateUserLogin = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value; 
    this.setState({[inputName]: inputValue})
  }

  validateLogin = event => {
    event.preventDefault();
    const loginInfo = {
      email: this.state.email,
      password: this.state.password
    }
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })
    .then(response => response.json())
    .then(response => this.props.updateUserId(response.user.id))
    .catch(error => console.log(error))
  }

}


export default Login