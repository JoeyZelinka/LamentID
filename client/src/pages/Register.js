import React, { useState } from 'react'
import { useHistory } from 'react-router'

export default function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/v1/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
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
            {error && (<div>{ error }</div>)}
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type='text'
                        placeholder='Enter E-mail'
                    />

                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                        placeholder='Enter Password'
                    />
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}
