import { React, useState } from 'react'
import { FiUser, FiMenu } from "react-icons/fi";
import { Link, useLocation } from 'react-router-dom'
import { IoCalendarOutline } from "react-icons/io5";
import classNames from 'classnames'
import { DASHBOARD_SIDEBAR_LINKS } from '../../lib/consts/navigation'

export default function Header() {
    const [showNav, setNav] = useState(false)
    return (
        <>
            {/* md+ header */}
            <div className="hidden md:flex flex-row border-b border-stone-500 dark:border-gray-100 text-stone-500 dark:text-white">
                <div className="flex-1">
                    <div className="flex flex-row w-auto">
                        <div className="flex-initial px-3 h-[60px] leading-[60px] align-middle font-semibold border-r border-stone-500 dark:border-gray-400 overflow-x-auto whitespace-nowrap">Total Workouts<span className="ml-3 font-normal dark:font-light text-stone-500 dark:text-slate-400">0</span></div>
                        <div className="flex-initial px-3 h-[60px] leading-[60px] align-middle font-semibold border-r border-stone-500 dark:border-gray-400 overflow-x-auto whitespace-nowrap">Total Weight Lifted<span className="ml-3 font-normal dark:font-light text-stone-500 dark:text-slate-400">0 lbs.</span></div>
                    </div>
                </div>
                <Link to="/account" className="py-1 px-2 rounded-lg my-auto mr-4 font-medium bg-stone-400 hover:bg-stone-300 dark:bg-gray-600 dark:hover:bg-slate-500 cursor-pointer text-white hover:no-underline"><FiUser className="inline" /> Account</Link>
            </div>
            {/* sm header */}
            <div className=" border-b-2 border-stone-500 dark:border-white text-white w-screen md:hidden">
                <div className="flex flex-row ">
                    <div className="flex-1 flex items-center gap-2 pl-6 py-4 text-xl text-stone-600 dark:text-white" >
                        <IoCalendarOutline />
                        <span className="font-bold ">GigaFit</span>
                    </div>
                    <div onClick={() => setNav(!showNav)} className="py-1 px-2 bg-slate-400 rounded-lg my-auto mr-4 font-medium bg-stone-400 hover:bg-stone-300 dark:bg-gray-600 dark:hover:bg-slate-500 cursor-pointer"><FiMenu className="inline" /></div>

                </div>
                {showNav && (
                    <div onClick={() => setNav(false)} className="border-2 dark:border border-stone-500 dark:border-white rounded-sm mx-4 my-2 p-2">
                        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                            <HeaderLink key={item.key} item={item} />
                        ))}
                        <HeaderLink item={{ path: '/account', icon: <FiUser className="inline" />, label: 'Account' }} />
                    </div>
                )}
            </div>
        </>
    )
}

const linkClasses = 'flex items-center gap-2 font-light px-3 py-1 y-2 hover:bg-stone-300/75 dark:hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-lg'

function HeaderLink({ item }) {
    const { pathname } = useLocation()

    return (
        <Link to={item.path} className={classNames(pathname == item.path ? 'bg-stone-300 text-stone-600 dark:bg-neutral-700 dark:text-white' : 'text-stone-500 dark:text-slate-400', linkClasses)}>
            {item.icon}<span className="text-xl"></span>
            {item.label}
        </Link>
    )
}