import React, { useState } from 'react'

export default function Register() {
    const [username, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error)
                }
            })
    }
    return (
        <div className='register'>
            {error && ({ error })}
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        value={username}
                        onChange={e => setEmail(e.target.value)}
                        type='text'
                        placeholder='Enter E-mail'
                    />

                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='text'
                        placeholder='Enter Password'
                    />
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}
