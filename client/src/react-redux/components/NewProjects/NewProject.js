import React from 'react'


export default function NewProject() {
    return (

        <div>
            
            <form className="newProject">
                <p>Keywords</p>
                <input name="keywords" type="text" maxLength="100"></input>
                <br/>
                <p>SubReddit</p>
                <input name="subreddit" type="text" maxLength="100"></input>
                <br/>
                <p>Suggested Keywords/SubReddits</p>
                <textarea  name="suggest" cols="20" rows="4"></textarea>
                <br/>
                <p>Project Name</p>
                <input name="keywords" type="text" maxLength="100"></input>
                <br/>
                <button type="submit">Save Project</button>

            </form>
        </div>
    )
}
