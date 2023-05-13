import React, { useState, useEffect, useContext } from 'react'
import Header from '../components/Header'
import { Context } from '../contexts/Context';
import {test} from '../functions/functions'

function Home() {
  const [resp, setResp] = useState('');
  const user = useContext(Context);

  useEffect(()=>{
    async function testConnection(){
        const res = await test();
        if(res){
          setResp(res);
        }
    }
    user.callUnsafeFunction(testConnection);
     
  },[])

  return (
    <>
      <Header />
      <div> This is Home Page  </div>
      <pre>
        {JSON.stringify(resp.data)}
      </pre>

    </>
  )
}

export default Home