import { Link } from 'react-router-dom'
import AddAvatarImg from '../img/addAvatar.png'

const Register = () => (
  <div className="formContainer">
    <div className="formWrapper">
      <span className="logo">Chat App</span>
      <span className="title">Register</span>
      <form>
        <input type="text" placeholder="display name" />
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <input style={{ display: 'none' }} type="file" id="file" />
        <label htmlFor="file">
          <img src={AddAvatarImg} alt="Add avatar icon" />
          <span>Add an avatar</span>
        </label>
        <button type="submit">Sign up</button>
      </form>
      <p>
        You do have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
)

export default Register
