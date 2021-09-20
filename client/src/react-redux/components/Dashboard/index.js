import React, { useEffect, useState } from 'react'
import { Tab, Tabs, Button, Container, Modal } from 'react-bootstrap'
import AddKeywords from '../AddKeywords'
import Graph from '../Graph'

function Dashboard() {
  const [ projects, setProjects ] = useState([])
  const [ comments, setComments ] = useState([])
  //modal variables start
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //modal variables end
  
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
              <Button variant="link" onClick={handleShow} key={project.id} data={project}>Add Another Keyword</Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Title>Add Keywords</Modal.Title>
                <Modal.Body><AddKeywords data={project}/></Modal.Body>
              </Modal>
            </Container>
              <Graph data={project.id} key={project.id} />
          </Tab>
        )
      })}
      </Tabs>
    </Container>
  );
}

export default Dashboard;
