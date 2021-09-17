import React, { useState } from 'react'
import { Card, Container, Form, Button } from 'react-bootstrap'

export default function AddKeywords(props) {
  const { project } = props;
  const [ searchTerm, setSearchTerm ] = useState("");
  const [ subreddit, setSubreddit ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/v1/${project.id}/keywords`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        searchTerm,
        subreddit
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error)
        }
      })
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Keyword: </Form.Label>
              <Form.Control
                value={searchTerm}
                name="keywords"
                onChange= {(e) => setSearchTerm(e.target.value)}
                type="text"
                maxLength="100"
                />
              <Form.Label>Subreddit: </Form.Label>
              <Form.Control
                value={subreddit}
                name="keywords"
                onChange= {(e) => setSubreddit(e.target.value)}
                type="text"
                maxLength="100"
                />
                <Button type="submit">Save</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
