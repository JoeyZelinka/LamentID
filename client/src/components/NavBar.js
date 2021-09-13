import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionLoggedIn, actionLoggedOut } from '../redux/actions/user';

function NavBar() {
  const { checked, user } = useSelector(state => state.user);
  const dispatch = useDispatch()

  const handleLogout = (e) => {
    e.preventDefault()
    fetch('/api/v1/users/logout')
      .then(res => res.json())
      .then(data => {
        dispatch(actionLoggedOut())
      })
  }
  const handleLogin = (e) => {
    e.preventDefault()
    fetch('/api/v1/users/login')
      .then(res => res.json())
      .then(data => {
        dispatch(actionLoggedIn())
      })
  }

  return (
    <nav>

      <Link as={Link} to="/">LamentID</Link>
      <Link as={Link} to="/about">About</Link>
      <Link as={Link} to="/newproject">Start New Project</Link>
      <Link as={Link} to="/accountprefs">Account Preferences</Link>
     
        
          { checked && user ? (
            <>
              <Link href="/logout" onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <form>
              <input type="text" name="username" placeholder="Username"/>
              <input type="text" name="password" placeholder="Password"/>
            <Link as={Link} to="/login" onClick={handleLogin}>Login</Link>
            </form>
          )}
        
     
    </nav>
  )
}

export default NavBar



/* <img src=''></img>
<button type='submit' className='about'>About</button>
<button type='submit' className='newProject'>Start New Project</button>
<button type='submit' className='accountPref'>Account Preferences</button> */