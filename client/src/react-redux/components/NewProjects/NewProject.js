import React, { useState } from 'react'
import { useHistory } from 'react-router';


export default function NewProject() {
    const [ projectName, setProjectName ] = useState("");
    const [ error, setError ] = useState("");
    const [ keywords, setKeywords ] = useState([{
        searchTerm: "",
        subreddit: ""
    }]);
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
                keywords: keywords
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

    const updateKeyword = (index, key, value) => {
        const newKeywords = [...keywords];
        newKeywords[index][key] = value;
        setKeywords(newKeywords)
    }

    return (
        <div className="newProjectForm">
            { error && (<div>{error}</div>) }
            <form 
                onSubmit={handleSubmit}
                className="newProject">
                <p>Project Name</p>
                <input 
                    value={projectName} 
                    name="keywords" 
                    onChange={(e) => setProjectName(e.target.value)}
                    type="text" 
                    maxLength="100" />
                <br/>
                {keywords.map((keyword, index) => {
                    return ( 
                        <div key={index}>
                            <label for="keywords">Keyword:</label>
                            <input 
                                value={keyword.searchTerm} 
                                onChange={(e) => updateKeyword(index, "searchTerm", e.target.value)}
                                name="keywords" 
                                type="text" 
                                maxLength="100" />
                            <label for="subreddit">Subreddit:</label>
                            <input 
                                value={keyword.subreddit} 
                                onChange={(e) => updateKeyword(index, "subreddit", e.target.value)}
                                name="subreddit" 
                                type="text" 
                                maxLength="100" />
                        </div>
                    )
                })}
                {/* <br/>
                <p>Suggested Keywords/SubReddits</p>
                <textarea  name="suggest" cols="20" rows="4"></textarea> */}
                <br/>
                <button type="submit">Save Project</button>
            </form>
        </div>
    )
}
