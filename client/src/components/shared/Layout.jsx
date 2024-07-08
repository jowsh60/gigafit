import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { CookiesProvider, useCookies } from 'react-cookie'

export default function Layout() {
    const [cookies, setCookie] = useCookies(['dark'])
    return (
        <div className={cookies.dark ? 'dark' : ''}>
            <div className="flex flex-row bg-stone-100 dark:bg-gray-950 min-h-screen w-screen overflow-auto ">
                <Sidebar/>
                <div className="flex-1 md:h-screen md:overflow-y-scroll">
                    <Header />
                    <div className="w-full">{<Outlet />}</div>
                </div>
            </div>
        </div>

    )
}