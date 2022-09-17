import { Link } from 'react-router-dom'

const Login = () => (
  <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">Chat App</span>
      <span className="title">Login</span>
      <form>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="submit">Sign in</button>
      </form>
      <p>
        You don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  </div>
)

export default Login
