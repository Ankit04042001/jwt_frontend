import React, { useContext } from 'react'
import { Link, json } from 'react-router-dom'
import { ProtectedLink } from '../PrivateRoute/Protected'
import { Context } from '../contexts/Context'

function Header() {
    const context = useContext(Context);
    let user = JSON.stringify(context.user);
    return (
        <>
            <div className='header'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <ProtectedLink isProtected={false}>
                        <li>
                            <Link to='/user/login'>Log In</Link>
                        </li>
                        <li>
                            <Link to='/user/register'>Register</Link>
                        </li>
                    </ProtectedLink>
                    <ProtectedLink isProtected={true}>
                        <li>
                            <Link to='/user/profile'>Hello, {context.user}</Link>
                        </li>
                        <li>
                            <Link to='/user/logout'>Log Out</Link>
                        </li>
                    </ProtectedLink>
                </ul>
            </div>
        </>
    )
}

export default Header