import React, { useContext } from 'react'
import { Context } from '../contexts/Context'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoutes(props) {
  const auth = useContext(Context)

  return (
    <>
      {props.isProtected?(auth.user ? <Outlet/> : <Navigate to='/' replace/>):(!auth.user ? <Outlet/> : <Navigate to='/' replace/>)}
    </>
  )
}

export default ProtectedRoutes



export function ProtectedLink(props) {
  const auth = useContext(Context)
  return (
    <>
      {props.isProtected?(auth.user ? props.children : <div></div>):(!auth.user ? props.children : <div></div>)}
    </>
  )
}