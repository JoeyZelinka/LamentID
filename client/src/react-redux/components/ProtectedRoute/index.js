import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useHistory } from 'react-router'

function ProtectedRoute(props) {
  const user  = useSelector(state => state.user)
  const history = useHistory()

 

  // if logged out
  if (!user) {
    // redirect to the login page
    history.push('/login')
    return ''
  }

  // if logged in
  // pass info to Route
  return <Route {...props} />
}

export default ProtectedRoute