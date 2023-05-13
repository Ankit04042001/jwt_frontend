import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { logout } from '../functions/functions'
import { Context } from '../contexts/Context'
import Loader from './Loader'

function Logout() {
    const [isLoading, setIsLoading] = useState(false);
    const context = useContext(Context);
    useEffect(() => {
        setIsLoading(true);
        const logOut = async () => {
            const res = await logout();
            if(res){
                setIsLoading(false);
                if(res.data.status){
                    context.setUser(null);
                    console.log('logout Successfully')
                }
            }else{
                setIsLoading(false);
            }
        }
        context.callUnsafeFunction(logOut);
    },[])
    return (
        <>
        {isLoading ? <Loader /> : <div></div>}
            <Header />
        </>
    )
}

export default Logout