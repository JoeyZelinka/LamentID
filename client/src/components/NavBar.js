import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionLoggedOut } from '../redux/actions/user';

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

  return (
    <nav>

      <Link as={Link} to="/">LamentID</Link>
     
        
          { checked && user ? (
            <>
              <Link as={Link} to="/about">About</Link>
              <Link href="/logout" onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <Link as={Link} to="/login">Login</Link>
          )}
        
     
    </nav>
  )
}

export default NavBar



/* <img src=''></img>
<button type='submit' className='about'>About</button>
<button type='submit' className='newProject'>Start New Project</button>
<button type='submit' className='accountPref'>Account Preferences</button> */