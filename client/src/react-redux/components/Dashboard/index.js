import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Button, Container } from 'react-bootstrap'
import Graph from '../Graph'

function Dashboard() {
  const [ projects, setProjects ] = useState([])
  const [ comments, setComments ] = useState([])

  useEffect(() => {
    fetch('/api/v1/projects/')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
      })
      .then(() => {
        projects.forEach(project => {
          fetch(`/api/v1/projects/${project.id}/comments`)
            .then(res => res.json())
            .then(data => {
              console.log(comments)
              setComments(data)
            })
        });
      })
  }, [])

  return (
    <Container>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
      { projects.map((project) => {
        return (
          <Tab eventKey={project.id} title={project.name}>
            <Container className="d-flex justify-content-end">
              <Button type="button" key={project.id}>Add More Keywords</Button>
            </Container>
              <Graph data={comments} key={project.id} />
            
          </Tab>
        )
      })}
      </Tabs>
    </Container>
  )
}

export default Dashboard
