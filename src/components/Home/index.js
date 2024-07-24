import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const {history} = props
  const onClickedLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <div className="home-container">
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <button type="button" className="logout-btn" onClick={onClickedLogout}>
          Logout
        </button>
      </div>
      <div className="account-container">
        <h1 className="heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}
export default Home
