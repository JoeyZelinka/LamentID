import React, { useEffect, useState } from "react";
import { Tab, Tabs, Button, Container } from "react-bootstrap";
import Graph from "../Graph";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [date, setDate] = useState({
    start_seconds_utc: 0,
    end_seconds_utc: 0
  })

  useEffect(() => {
    fetch("/api/v1/projects/")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  }, []);

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
              <Container className="d-flex">
                <Button type="button" key={project.id}>
                  Add More Keywords
                </Button>
              </Container>
              <Graph date={date} data={project.id} key={project.id} />
                <br/>
              <Container className="d-flex">
                <Button>Set Date</Button>
              </Container>
            </Tab>
          );
        })}
      </Tabs>
    </Container>
  );
}

export default Dashboard;
