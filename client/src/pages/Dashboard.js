import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


function Dashboard() {
    const [whatever, setWhatever] = useState([])
  const {user} = useSelector(state => state.user);

  const fetchWhatever = (data) => {
    fetch('')
      .then(res => res.json())
      .then(data => {
        setWhatever(data)
      })
  }

  useEffect(() => {
    fetchWhatever()
  }, [])
  

  return (
    <div>

      <card className='dataReturn'></card>
    
    </div>
  )
}

export default Dashboard

