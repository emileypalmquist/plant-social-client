import { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../redux/actions/userActions'

const Login = ({login, history}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    login(e, {username, password}, '/login', history)
  }
  
  return (
    <div className='form-container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>username: </label>
              <input id='username' type='text' name='username' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
          <br/>
          <label htmlFor='password'>password: </label>
              <input id='password' type={showPassword ? 'text' : 'password'} name='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <br/>
          <label htmlFor='submit'/>
          <input id='submit' type='submit' />
        </form>

        <button onClick={() => setShowPassword(!showPassword)}>Show Password</button>
    </div>
  )
}

export default connect(null, {login})(Login);