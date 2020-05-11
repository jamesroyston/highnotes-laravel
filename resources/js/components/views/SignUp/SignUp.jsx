import React, { useState, useContext } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

const SignUp = (props) => {
  const { signup, isAuth } = useContext(AuthContext)
  const [payload, setPayload] = useState({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
  })

  const updateName = e => {
    setPayload({...payload, name: e.target.value})
  }

  const updateEmail = e => {
    setPayload({...payload, email: e.target.value})
  }

  const updatePass = e => {
    setPayload({...payload, password: e.target.value})
  }

  const updateConfirm = e => {
    setPayload({...payload, password_confirmation: e.target.value})
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { name, email, password, password_confirmation } = payload;
    await signup(name, email, password, password_confirmation)
    if (isAuth) {
      await props.history.push('/profile')
    }
  }

  return (
    <div>
      {isAuth ? <Redirect to="/profile" /> :
        (<div>
          <div className="container">
            <h1>Not a user? Sign up below: </h1>
            <form onSubmit={e => handleSubmit(e)}>
              <div className="form-group">
                <label htmlFor="username">Name</label>
                <input className="form-control" id="username" type="text" placeholder="Enter name" name="username" value={payload.name} onChange={updateName} required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control" id="email" type="email" placeholder="Enter email" name="username" value={payload.email} onChange={updateEmail} required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control" placeholder="Password" type="password" name="password" id="password" value={payload.password} onChange={updatePass} required />
              </div>

              <div className="form-group">
                <label htmlFor="passwordConfirm">Confirm Password:</label>
                <input className="form-control" placeholder="Confirm password" type="password" name="password" id="passwordConfirm" value={payload.password_confirmation} onChange={updateConfirm} required />
              </div>
              <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            <p>Already a user? &nbsp;<Link to="/login">Login</Link></p>
          </div>
        </div>)
      }
    </div>
  )
}

export default withRouter(SignUp)
