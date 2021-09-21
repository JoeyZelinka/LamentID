import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Container, Form, Card } from "react-bootstrap";
import "./index.css";

export default function NewProject() {
    const [projectName, setProjectName] = useState("");
    const [error, setError] = useState("");
    const [keywords, setKeywords] = useState([
        {
            searchTerm: "",
            subreddit: "",
        },
    ]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/v1/projects/new", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: projectName,
                keywords: keywords,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data.error);
                    setError(data.error);
                } else {
                    console.log(keywords);
                    history.push("/dashboard");
                }
            });
    };

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
        <Container className="newProjectForm">
            <div className="information">
                <h1 className="display-6">
                    Start a New Project
                </h1>
                <p>
                    Please include a name for your project, the words you would like to search for, and the names of the subreddits you'd like to search in.
                </p>
            </div>
            {error && <div>{error}</div>}
            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="newProject">
                            <Form.Label >Project Name:</Form.Label>
                            <Form.Control
                                value={projectName}
                                name="keywords"
                                onChange={(e) => setProjectName(e.target.value)}
                                type="text"
                                maxLength="100"
                            />
                            {keywords.map((keyword, index) => {
                                return (
                                    <Container key={index}>
                                        <Form.Label>Keyword:</Form.Label>
                                        <Form.Control
                                            value={keyword.searchTerm}
                                            onChange={(e) =>
                                                updateKeyword(index, "searchTerm", e.target.value)
                                            }
                                            name="keywords"
                                            type="text"
                                            maxLength="100"
                                        />
                                        <Form.Label>Subreddit:</Form.Label>
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
                            <Container className="buttons">
                                <Button variant="warning mx-1" onClick={addNewKeywords}>
                                    +
                                </Button>
                                <Button variant="primary" type="submit">
                                    Save Project
                                </Button>
                            </Container>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );

}
