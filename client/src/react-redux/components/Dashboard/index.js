import React, { useEffect, useState } from "react";
import { Tab, Tabs, Button, Container, Modal, Form } from "react-bootstrap";
import AddKeywords from "../AddKeywords";
import Graph from "../Graph";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  // const [ comments, setComments ] = useState([])
  const [control, setControl] = useState({
    start_date: -1,
    end_date: -1,
    filter_sentiment: false
  });
  //modal variables start
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //modal variables end

  useEffect(() => {
    fetch("/api/v1/projects/")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
    // .then(() => {
    //   projects.forEach(project => {
    //     fetch(`/api/v1/projects/${project.id}/comments`)
    //       .then(res => res.json())
    //       .then(data => {
    //         setComments(data)
    //       })
    //   });
    // })
  }, []);
  const handleSubmit = () => {

  }

  return (
    <Container>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        {projects.map((project) => {
          return (
            <Tab eventKey={project.id} title={project.name}>
              <br />
              <Graph date={control} data={project.id} key={project.id} />
              <br/>
              <Container className="d-flex">
                <Button
                  variant="secondary"
                  onClick={handleShow}
                  key={project.id}
                  data={project}
                >
                  Add Another Keyword
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Title>Add Keywords</Modal.Title>
                  <Modal.Body>
                    <AddKeywords data={project} />
                  </Modal.Body>
                </Modal>
              </Container>
              <br/>
              <Container>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="" />
                    <Form.Text className="text-muted">
                      # of Minutes, Hours or Days
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Control as="select">
                      <option value="minutes">Minutes</option>
                      <option value="hours">Hours</option>
                      <option value="days">Days</option>
                    </Form.Control>
                    <br/>
                    <Form.Check
                      type="checkbox"
                      label="Filter Neutral Sentiment"
                    />
                  </Form.Group>
                  <Button variant="secondary" type="submit">
                    Update Graph
                  </Button>
                </Form>
              </Container>
            </Tab>
          );
        })}
      </Tabs>
    </Container>
  );
}

export default Dashboard;
