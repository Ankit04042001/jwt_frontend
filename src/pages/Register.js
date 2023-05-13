import React, { useState } from 'react'
import Loader from './Loader'
import { register } from '../functions/functions'
import { useLocation, useNavigate } from 'react-router-dom'

function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    console.log(location)
    location.state = 'something';
    console.log(location)


    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const res = await register(firstName, lastName, email, password, confirmPassword);
        if(res.data.status){
            setIsLoading(false);
            navigate('/user/otp', {replace:true})
        }else{
            setIsLoading('false')
            alert('something unexpected occurs, register again')
            navigate('/user/register', {state : {somethng : 'somehting'}}, {replace:true} )
        }

    }


    return (
        <>
            {isLoading ? <Loader /> : <div></div>}
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor='fname'>First Name</label>
                <input type='text' placeholder='First Name' id='fname' onChange={e => setFirstName(e.target.value)} />
                <label htmlFor='lname'>Last Name</label>
                <input type='text' placeholder='Last Name' id='lname' onChange={e => setLastName(e.target.value)} />
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='email' id='email' onChange={e => setEmail(e.target.value)} />
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='password' id='password' onChange={e => setPassword(e.target.value)} />
                <label htmlFor='confirm_password'>Password</label>
                <input type='password' placeholder='confirm password' id='confirm_password' onChange={e => setConfirmPassword(e.target.value)} />
                <button type='submit'>submit</button>
            </form>
        </>
    )
}

export default Register