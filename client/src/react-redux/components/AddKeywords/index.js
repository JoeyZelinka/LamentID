import React, { useState } from 'react'
import { Card, Container, Form, Button } from 'react-bootstrap'

export default function AddKeywords(props) {
  // const { project } = props.data;
  const [keywords, setKeywords] = useState([
    {
      searchTerm: "",
      subreddit: ""
    }
  ])

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/v1/projects/${props.data.id}/keywords`, {
      method: "POST",
      headers: {
          "Content-type": "application/json",
      },
      body: JSON.stringify({
          keywords: keywords,
      }),
  })
      .then((res) => res.json())
      .then((data) => {
          if (data.error) {
              console.log(data.error);
          } else {
              console.log(keywords);
          }
      });
}

  const updateKeyword = (index, key, value) => {
    const newKeywords = [...keywords];
    newKeywords[index][key] = value;
    setKeywords(newKeywords);
  };

  //? add button to add rows and add new object to state
  const addNewKeywords = () => {
    setKeywords([
      ...keywords,
      {
        searchTerm: "",
        subreddit: "",
      },
    ]);
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              {keywords.map((keyword, index) => {
                return (
                  <Container key={index}>
                    <Form.Label for="keywords">Keyword:</Form.Label>
                    <Form.Control
                      value={keyword.searchTerm}
                      onChange={(e) =>
                        updateKeyword(index, "searchTerm", e.target.value)
                      }
                      name="keywords"
                      type="text"
                      maxLength="100"
                    />
                    <Form.Label for="subreddit">Subreddit:</Form.Label>
                    <Form.Control
                      value={keyword.subreddit}
                      onChange={(e) =>
                        updateKeyword(index, "subreddit", e.target.value)
                      }
                      name="subreddit"
                      type="text"
                      maxLength="100"
                    />
                  </Container>
                );
              })}
              <Button variant="warning" onClick={addNewKeywords}>+</Button>
              <Button type="submit">Save</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}
