import React, {useContext} from 'react'
import classNames from 'classnames'
import { IoCalendarOutline, IoLogOutOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DASHBOARD_SIDEBAR_LINKS,DASHBOARD_SIDEBAR_BOTTOM_LINKS } from '../../lib/consts/navigation'
import { TokenContext } from '../../App'
import { useCookies } from 'react-cookie'


export default function SideBar(){

    const [cookies, removeCookie] = useCookies(['login']);
    const [token, setToken] = useContext(TokenContext)
    const navigate = useNavigate()

    const logout = () => {
        removeCookie('login')
        setToken(null)
        navigate('/login')
    }

    return(
        <div className="hidden md:flex w-60 p-5 pt-2 flex flex-col border-r border-stone-500 dark:border-slate-400 text-stone-600 dark:text-white">
            <div className="flex items-center gap-2 px-1 py-3 text-xl" >
                <IoCalendarOutline />
                <span className="font-bold">GigaFit</span>
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
                <div onClick={logout} className={classNames('text-red-400 cursor-pointer', linkClasses)}>
                    <IoLogOutOutline/><span className="text-xl"></span>
                    Logout
                </div>
            </div>
        </div>
    )
}

const linkClasses = 'flex items-center gap-2 font-normal dark:font-light px-3 py-1 y-2 hover:bg-stone-300/75 dark:hover:bg-neutral-700 hover:no-underline active:bg-stone-400 dark:active:bg-neutral-600 rounded-sm text-lg'

function SidebarLink({item}){
    const {pathname} = useLocation()

    return (
        <Link to={item.path} className={classNames(pathname==item.path ? 'bg-stone-300 text-stone-600 dark:bg-neutral-700 dark:text-white' : 'text-stone-500 dark:text-slate-400', linkClasses)}>
            {item.icon}<span className="text-xl"></span>
            {item.label}
        </Link>
    )
}