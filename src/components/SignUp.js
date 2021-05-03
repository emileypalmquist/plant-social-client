import { useState } from 'react'
import { connect } from 'react-redux'
import {Form, Button} from "semantic-ui-react"
import { login } from '../redux/actions/userActions'

const SignUp = ({login, history}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [email, setEmail] = useState('')
  const [growZone, setGrowZone] = useState('')
  const [experience, setExperience] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    let user = {
      username, 
      password, 
      password_confirmation: passwordConfirmation,
      email,
      zone: growZone,
      experience_level: experience,
    }
    
    login(e, user, '/users', history)
  }

  return (
    <div className='form-container'>
        <h1>Create an Account</h1>
        <Form onSubmit={ handleSubmit }>
          <Form.Field>
            <label htmlFor='username'>Username: </label>
            <input id='username' type='text' name='username' placeholder='username' onChange={(e) => setUsername(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='password'>Password: </label>
            <input id='password' type={showPassword ? 'text' : 'password'} name='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='passwordConfirmation'>Password Confirmation: </label>
            <input id='passwordConfirmation' type={showPassword ? 'text' : 'password'} name='passwordConfirmation' placeholder='password confirmation' onChange={(e) => setPasswordConfirmation(e.target.value)}/>
          </Form.Field>
          <Form.Field>
            <label htmlFor='email'>Email: </label>
            <input id='email' type='email' name='email' placeholder='email' onChange={(e) => setEmail(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='growZone'>Grow Zone: </label>
            <input id='growZone' type='text' name='growZone' placeholder='grow zone' onChange={(e) => setGrowZone(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label htmlFor='experience'>Experience: </label>
            <input id='experience' type='text' name='experience' placeholder='experience' onChange={(e) => setExperience(e.target.value)} />
          </Form.Field>

          <label htmlFor='submit'/>
          <Button type='submit'>Let's Go!</Button>
        </Form>
        <Button onClick={() => setShowPassword(!showPassword)}>Show Passwords</Button>
    </div>
  )
}

export default connect(null, {login})(SignUp);