import React, { useContext, useState, useEffect } from 'react';
import { loginRequest } from '../api/account'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import moment from 'moment'
import { TokenContext } from '../App'
import { useCookies } from 'react-cookie'


export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [cookies, setCookie] = useCookies(['dark', 'login'])
    const [token, setToken] = useContext(TokenContext)
    const [stayLoggedIn, setStayLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{ //Skip login if login cookies are set
        if(cookies.login != undefined && cookies.login !== 'undefined' && token !== 'undefined'){
            setToken(cookies.login)
            navigate('/')
        }
        if(cookies.dark != undefined){
            setCookie('dark', cookies.dark, { path: '/', maxAge:604800 })
        }
        if(window.location.href.includes('demo')){
            setUsername('demo')
            setPassword('nerd')
        }
    }, [])

    const handeLogin = (e) => {
        e.preventDefault()
        loginRequest({ username, password })
            .then(({ token }) => {
                setToken(token)
                if(stayLoggedIn) setCookie('login', token, { path: '/', maxAge:604800 })
                navigate('/')
            }).catch(err => {
                setError(err.message)
            })
    }


    return (
        <div className={cookies.dark ? 'dark' : ''}>
            <div className="w-screen h-screen bg-stone-100 dark:bg-gray-950 py-16 ">
                <div className="border-double border-4 border-sky-500 dark:border-sky-600 p-4 rounded-md w-96 max-w-full mx-auto text-stone-500 dark:text-white dark:shadow-[0px_0px_35px_-12px_#06b6d4]">
                    <h2 className=" text-xl font-semibold">Login</h2>
                    <form onSubmit={handeLogin} className="mb-2">
                        <input type="text" placeholder="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-transparent border border-stone-500 dark:border-gray-100 rounded-sm w-full h-10 px-2 mb-2 outline-none" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent border border-stone-500 dark:border-gray-100 rounded-sm w-full h-10 px-2 outline-none" />
                        <div style={{ color: "red" }}>{error}</div>
                        <div className="mt-2"><input type="checkbox" defaultChecked={false} onChange={()=>setStayLoggedIn(!stayLoggedIn)} className=""></input> Stay logged in for 1 week</div>
                        <button className="mt-2 p-0.5 p-1 w-full bg-sky-500/75 border-sky-500 border-4 rounded-md hover:bg-cyan-400/75 font-medium text-white">Login</button>
                    </form>
                    <span>Don't have an account yet? <Link to='/register'>Sign Up</Link></span>
                </div>
            </div>
        </div>


    )

}