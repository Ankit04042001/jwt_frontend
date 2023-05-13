import React, {useEffect, useState} from 'react'
import { verify_otp } from '../functions/functions'
import Loader from './Loader'
import { useLocation } from 'react-router-dom'

function Otp() {
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const state = useLocation() 
    const [parentUrl, setParentUrl] = useState(state)
    console.log(parentUrl)
    console.log(state)
    

    const handleSubmit = async(e)=>{
        setIsLoading(true)
        e.preventDefault()
        const res = await verify_otp(otp, parentUrl)
        if(res.data.status){
            setIsLoading(false)
            alert('success')
        }else{
            setIsLoading(false)
            alert('fail')
        }
    }

  return (
    <>
    
    {isLoading ? <Loader /> : <div></div>}
    <form method='post' onSubmit={handleSubmit}>
        <label htmlFor='otp'>Enter Otp</label>
        <input type='text' placeholder='Otp' id='otp' onChange={e=>{setOtp(e.target.value)}} />
        <input type='submit' />
    </form>
    </>
  )
}

export default Otp