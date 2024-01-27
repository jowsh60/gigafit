import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import {Outlet} from 'react-router-dom'

export default function Layout(){
    return (

        <div className="flex flex-row bg-slate-950 h-screen w-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 overflow-scroll">
                <Header />
                <div className="w-full">{<Outlet/>}</div>
            </div>
        </div>
    )
}