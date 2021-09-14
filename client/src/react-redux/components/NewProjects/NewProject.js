import React, { useState } from 'react'
import { useHistory } from 'react-router';


export default function NewProject() {
    const [ searchTerm, setSearchTerm] = useState("");
    const [ subreddit, setSubreddit ] = useState("");
    const [ projectName, setProjectName ] = useState("");
    const [ error, setError ] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/v1/projects/new", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: projectName,
                keywords: [{
                    searchTerm,
                    subreddit
                }]
            })
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error)
                } else { 
                    history.push("/dashboard")
                }
            })
    }

    return (
        <div>
            { error && (<div>{error}</div>) }
            <form 
                onSubmit={handleSubmit}
                className="newProject">
                <p>Keyword</p>
                <input 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    name="keywords" 
                    type="text" 
                    maxLength="100" />
                <br/>
                <p>SubReddit</p>
                <input 
                    value={subreddit} 
                    onChange={(e) => setSubreddit(e.target.value)}
                    name="subreddit" 
                    type="text" 
                    maxLength="100" />
                <br/>
                <p>Suggested Keywords/SubReddits</p>
                <textarea  name="suggest" cols="20" rows="4"></textarea>
                <br/>
                <p>Project Name</p>
                <input 
                    value={projectName} 
                    name="keywords" 
                    onChange={(e) => setProjectName(e.target.value)}
                    type="text" 
                    maxLength="100" />
                <br/>
                <button type="submit">Save Project</button>
            </form>
        </div>
    )
}
