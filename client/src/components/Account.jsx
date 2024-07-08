import { React, useEffect, useState, useContext } from 'react'
import Ping from './parts/Ping.jsx'
import { readPreferencesRequest, savePreferencesRequest, changePasswordRequest } from '../api/account'
import { useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from 'react-query'
import { TokenContext } from '../App';
import { useCookies } from 'react-cookie'

export default function Account() {
    const [saved, setSaved] = useState(true)
    const [preferences, setPreferences] = useState({})
    const [tempPref, setTempPref] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [token, setToken] = useContext(TokenContext)
    const [cookies, setCookie] = useCookies(['dark'])
    const [loginCookie, removeCookie] = useCookies(['login']);
    const [status, setStatus] = useState()
    const navigate = useNavigate()


    const { isLoading, data: prefQuery } = useQuery(
        'preferences',
        () => readPreferencesRequest(token),
    );

    const logout = () => {
        removeCookie('login')
        setToken(null)
        navigate('/login')
    }


    //Detect change in any foods
    const handleChange = (e, propName) => {
        let temp = preferences
        if (propName === 'calorie_goal' || propName === 'weight_phase') {
            temp[propName] = parseInt(Number(e.target.value))
        } else {
            temp.macro_goal[propName] = Number(e.target.value)
        }
        setPreferences(temp);
        setSaved(JSON.stringify(temp) === JSON.stringify(tempPref))
    };

    const themeChange = () => {
        setCookie('dark', !cookies.dark, { path: '/', maxAge: 604800 })
    }

    const { mutate: savePreferences } = useMutation(() => {
        return savePreferencesRequest(preferences, token)
    })



    const { mutate: changePassword } = useMutation({
        mutationFn: () => {return changePasswordRequest(password, newPassword, token) },
        onSuccess: (data) => {
            if(data.status){
                setStatus("Success!")
                setPassword(null)
                setNewPassword(null)
            }else{
                setStatus("Please enter the correct password to set your new password")
            }
        }
    })

    const change = () => {
        if(password !== '' && newPassword !== ''){
            if(password === newPassword){
                console.log(1)
                setStatus('New password can not be same as old password')
                return
            }
            changePassword()
        }else{
            setStatus('Please enter both passwords')
        }
    }


    const save = () => {
        savePreferences()
        setSaved(true)
        setTempPref(JSON.parse(JSON.stringify(prefQuery || '')))
    }

    useEffect(() => {
        setPreferences(prefQuery)
        setTempPref(JSON.parse(JSON.stringify(prefQuery || '')))
    }, [prefQuery]);


    return (
        <div className="text-stone-600 dark:text-white p-6">
            <h1 className="text-xl">Appearance</h1>
            <label className="mt-4 inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={cookies.dark || false} onChange={themeChange} className="sr-only peer"></input>
                <div className="relative w-11 h-6 bg-stone-400 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Dark Mode</span>
            </label><br />
            <div className="w-5/6 lg:w-1/2 px-4 my-3 border-b border-white"></div>
            <h1 className="text-xl">Diet Preferences</h1>
            {isLoading || preferences == null ? 'loading...' : (
                <>
                    <div className="border-none py-4">Calorie Goal: <input type="number" onChange={(e) => { handleChange(e, 'calorie_goal') }} defaultValue={preferences?.calorie_goal || ''} className="text-slate-800 w-20 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" /> cal</div>
                    Weight Phase:
                    <select
                        defaultValue={preferences?.weight_phase}
                        onChange={(e) => { handleChange(e, 'weight_phase') }}
                        className="bg-transparent border border-stone-400 dark:border-white rounded-sm h-10 px-2 outline-none"
                    >
                        <option value={1}>Bulk</option>
                        <option value={0}>Maintenance</option>
                        <option value={-1}>Cut</option>
                    </select>
                    <span className="block mt-4 underline">Macro Goals:</span>
                    <div className="flex flex-row flex-wrap w-full md:w-2/3">
                        <div className="border-none py-4 mr-4">Carbs: <input type="number" onChange={(e) => { handleChange(e, 'c') }} defaultValue={preferences?.macro_goal?.c || ''} className="text-slate-800 w-14 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" /> g</div>
                        <div className="border-none py-4 mr-4">Fat: <input type="number" onChange={(e) => { handleChange(e, 'f') }} defaultValue={preferences?.macro_goal?.f || ''} className="text-slate-800 w-14 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" /> g</div>
                        <div className="border-none py-4 mr-4">Protein: <input type="number" onChange={(e) => { handleChange(e, 'p') }} defaultValue={preferences?.macro_goal?.p || ''} className="text-slate-800 w-14 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" /> g</div>
                    </div>
                    <span className="relative inline-flex mt-3 text-white">
                        <button onClick={save} className="p-0.5 px-1 bg-sky-600/75 border-sky-600 border-4 rounded-md hover:bg-cyan-500/75 font-medium">Save</button>
                        {!saved && <Ping />}
                    </span>
                </>
            )}
            <div className="w-5/6 lg:w-1/2 px-4 mt-8 border-b border-white"></div>
            <h1 className="text-xl mt-4">Account Settings</h1>
            <div className="w-full md:px-12">
                <h1 className="text-lg">Change Password</h1>
                <div className="my-2"><label>Current Password: </label><input onChange={(e) => { setPassword(e.target.value) }} type="password" className="text-slate-800 w-64 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" /></div>
                {status ? (<span className="ml-6">{status}</span>) : ''}
                <div className="my-2"><label>New Password: </label><input onChange={(e) => { setNewPassword(e.target.value) }} type="password" className="text-slate-800 w-64 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" /></div>
                <button onClick={change} className="text-white p-0.5 px-1 bg-sky-600/75 border-sky-600 border-4 rounded-md hover:bg-cyan-500/75 font-medium">Update Password</button>
            </div>
            <button onClick={logout} className="block p-0.5 px-1 mt-12 mx-auto md:mx-0 bg-transparent border-rose-700 border-2 rounded-md hover:border-rose-600 font-medium text-rose-700" >Log out</button>

        </div>
    )

}