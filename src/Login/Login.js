import React, { Component } from 'react'
import './Login.css'
import PropTypes from 'prop-types'

class Login extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      email: '',
      password: ''
    }
  }

  render() {
    console.log(this.props)
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
          onClick={this.handleLogin}
          >Log in
        </button>
        {this.props.error &&
          <h3 className='error-msg'>{this.props.error}</h3>
        }
      </form>
    )
  }

  updateUserLogin = event => {
    const inputName = event.target.name;
    const inputValue = event.target.value; 
    this.setState({[inputName]: inputValue}) 
  }

  resetForm = () => {
    this.setState({
      email: '',
      password: ''
    })
  }

  validateLogin = event => {
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
    .then(response => {
      this.props.updateUserId(response.user.id)
      this.props.updateLoginStatus(true)
      this.props.changeView('homepage')
    })
    .catch(error => {
      console.log(error);
      this.props.updateError('Invalid username or password')
    })
  }

  handleLogin = event => {
    event.preventDefault();
    this.validateLogin(event);
    this.resetForm()
  }
}

Login.propTypes = {
  updateUserId: PropTypes.func,
  error: PropTypes.string
}


export default Login