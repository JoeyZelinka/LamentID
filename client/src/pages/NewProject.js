import React from 'react'
import NavBar from '../components/NavBar'

export default function NewProject() {
    return (

        <div>
            <NavBar/>
            <form className="newProject">
                <p>Keywords</p>
                <input name="keywords" type="text" maxLength="100"></input>
                <br/>
                <p>SubReddit</p>
                <input name="subreddit" type="text" maxLength="100"></input>
                <br/>
                <p>Suggested Keywords/SubReddits</p>
                <textarea  name="suggest" cols="20" rows="4"></textarea>
            </form>
        </div>
    )
}
