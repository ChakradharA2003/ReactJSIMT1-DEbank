import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    errorMessage: '',
    userId: '',
    pin: '',
    isLoginFail: false,
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value, errorMessage: ''})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value, errorMessage: ''})
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }
    const loginApiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onLoginSuccess(data.jwt_token)
      this.setState({userId: '', pin: '', isLoginFail: false})
    } else {
      this.setState({isLoginFail: true, errorMessage: data.error_msg})
    }
  }

  render() {
    const {errorMessage, isLoginFail, userId, pin} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <form
            onSubmit={this.onSubmitLoginForm}
            className="login-form-container"
          >
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="userId" className="label-style">
                User ID
              </label>
              <input
                id="userId"
                type="text"
                value={userId}
                placeholder="Enter User ID"
                className="input-field"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin" className="label-style">
                PIN
              </label>
              <input
                id="pin"
                type="password"
                value={pin}
                placeholder="Enter PIN"
                className="input-field"
                onChange={this.onChangePin}
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            {isLoginFail && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
