import React from 'react'
import classNames from 'classnames'
import { LuCalendarRange } from "react-icons/lu";
import { Link, useLocation } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS,DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/consts/navigation'
import { HiOutlineLogout } from 'react-icons/hi'

export default function SideBar(){
    return(
        <div className="bg-slate-950 w-60 p-5 pt-2 flex flex-col text-white border-r border-slate-400">
            <div className="flex items-center gap-2 px-1 py-3 text-xl" >
                <LuCalendarRange />
                <span className="text-gray-100 font-bold">GigaFit</span>
            </div>
            <div className="flex-1 py-2 flex flex-col gap-0.5">
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>
            <div className="flex flex-col gap-0.5 pt-2 border-t border-neutral-700">
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map(item => (
                    <SidebarLink key={item.key} item={item}/>
                ))}
                <div className={classNames('text-red-400 cursor-pointer', linkClasses)}>
                    <HiOutlineLogout/><span className="text-xl"></span>
                    Logout
                </div>
            </div>
        </div>
    )
}

const linkClasses = 'flex items-center gap-2 font-light px-3 py-1 y-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-lg'

function SidebarLink({item}){
    const {pathname} = useLocation()

    return (
        <Link to={item.path} className={classNames(pathname==item.path ? 'bg-neutral-700 text-gray-100' : 'text-slate-400', linkClasses)}>
            {item.icon}<span className="text-xl"></span>
            {item.label}
        </Link>
    )
}