import React, { createContext, useEffect, useState } from 'react'
import { getUser } from '../functions/functions';
import { parseJwt, refresh } from '../functions/functions'
import { useNavigate } from 'react-router-dom';


export const Context = createContext();

function ContextProvider(props) {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  let isExpired = false;

  const callUnsafeFunction = function (func) {
    if (localStorage.access) {
      try {
        const res = parseJwt(localStorage.access);
        console.log(res);
        const currentTimeStamp = new Date().getTime();
        if (res.exp * 1000 - currentTimeStamp < 1) {
          isExpired = true;
        }
      }catch (e) {
        alert('something went wrong. Login again.')
        navigate('/user/login', { replace: true })
      }

    }
    if (isExpired) {
      refresh().then(res => {
        if (res.data.status) {
          localStorage.access = res.data.data.access;
          localStorage.refresh = res.data.data.refresh;
          func();
        } else {
          if (res.data.error_code === 'expired') {
            alert('Session Timeout. Login Again');
            navigate('/login', { replace: true });
          } else {
            alert(res.data.msg);
          }
        }
      })
    } else {
      func();
    }

  }

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser().catch(error => console.log(error));
      if (res) {
        if (res.data.status) {
          console.log(res.data);
          setUser(res.data.data.first_name)
        }
      }
    }
    callUnsafeFunction(fetchUser);
  }, [])

  return (
    <>
      <Context.Provider value={{ user, setUser, callUnsafeFunction }}>
        {props.children}
      </Context.Provider>
    </>
  )
}

export default ContextProvider