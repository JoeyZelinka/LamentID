import React, { useEffect, useState } from 'react'
import Graph from '../Graph'

function Dashboard() {
  const [ projects, setProjects ] = useState([])

  useEffect(() => {
    fetch('/api/v1/projects/')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setProjects(data)
      })
  }, [])

  return (
    <div>
      { projects.map((project) => {
        return (
          <Graph data={project} key={project.id} />
        )
      })}
    </div>
  )
}

export default Dashboard
