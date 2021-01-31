import { useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../redux/actions/userActions'

const SignUp = ({login}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [growZone, setGrowZone] = useState('')
  const [experience, setExperience] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    login(e, {username, password}, '/users')
  }

  return (
    <div className='form-container'>
        <h1>Create an Account</h1>
        <form onSubmit={ handleSubmit }>
          <label htmlFor='username'>Username: </label>
          <input id='username' type='text' name='username' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
          <br/>

          <label htmlFor='password'>Password: </label>
          <input id='password' type={showPassword ? 'text' : 'password'} name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
          <br/>

          <label htmlFor='passwordConfirmation'>Password Confirmation: </label>
          <input id='passwordConfirmation' type={showPassword ? 'text' : 'password'} name='passwordConfirmation' placeholder='password confirmation' onChange={(e) => setPasswordConfirmation(e.target.value)}/>
          <br/>

          <label htmlFor='email'>Email: </label>
          <input id='email' type='text' name='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
          <br/>

          <label htmlFor='growZone'>Grow Zone: </label>
          <input id='growZone' type='text' name='growZone' placeholder='grow zone' onChange={(e) => setGrowZone(e.target.value)} />
          <br/>

          <label htmlFor='experience'>Experience: </label>
          <input id='experience' type='text' name='experience' placeholder='experience' onChange={(e) => setExperience(e.target.value)} />
          <br/>

          <label htmlFor='submit'/>
          <input id='submit' type='submit' value="Let's Go!"/>
        </form>
        <button onClick={() => setShowPassword(!showPassword)}>Show Passwords</button>
    </div>
  )
}

export default connect(null, {login})(SignUp);