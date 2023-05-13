import React, {useContext, useState} from 'react'
import Header from '../components/Header'
import { login } from '../functions/functions'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'
import { Context } from '../contexts/Context'



function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const user = useContext(Context);

    const handleSubmit = async (e)=>{
        setIsLoading(true);
        e.preventDefault();
        const res = await login(email, password);
        if(res){
            setIsLoading(false);
            if(res.data.status){
                console.log('logged in successfully');
                user.setUser(res.data.data.first_name);

                navigate('/', {replace : true})
            }else{
                console.log(res.data.msg);
            }
        }else{
            setIsLoading(false);
        }

    }


    return (
        <>
          {isLoading ?<Loader />:<div></div>}  
            <Header />
            <form method='post' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input type='email' placeholder='email' id='email' onChange={e=>setEmail(e.target.value)}/>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='password'  id='password' onChange={e=>setPassword(e.target.value)}/>
                <button type='submit'>submit</button>
            </form>

        </>
    )
}

export default Login