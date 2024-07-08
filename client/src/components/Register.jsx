import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import CalCalulator from './parts/CalCalculator.jsx';
import { registerRequest, checkEmailUsername } from '../api/account'
import Spinner from './parts/Spinner.jsx'
import { useCookies } from 'react-cookie'
import { IoHelpCircleOutline } from "react-icons/io5";


export default function Register() {
    const [cookies, setCookie] = useCookies(['dark'])
    const [data, setData] = useState({
        email: null,
        username: null,
        first_name: null,
        last_name: null,
        password: null,
        birthday: null,
        gender: null,
        calorie_goal: 2000,
        weight_phase: 0,
    })
    const [repassword, setRepassword] = useState('')
    const [error, setError] = useState('')
    const [secondStage, setSecondStage] = useState(false)
    const [calculator, showCalculator] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const [token, setToken] = useState()
    const navigate = useNavigate()

    const handleChange = (e, index) => {
        const temp = { ...data, [index]: e.target.value }
        setData(temp);
    }

    async function check() {
        switch (true) {
            case data.first_name == null || data.first_name == '':
                setError('Please enter your first name')
                return
            case data.email == null || data.email == '' || data.email.match(/^\S+@\S+\.\S+$/) == null:
                setError('Please enter a valid email')
                return
            case data.email.length > 255:
                setError('Please enter a email username (255 char. limit)')
                return
            case data.username == null || data.username == '':
                setError('Please enter a username')
                return
            case data.username.match(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/) == null:
                setError(`Please enter a valid username:
                Only contains alphanumeric characters, underscore and dot.\n
                Underscore and dot can't be at the end or start of a username.\n
                Underscore and dot can't be next to each other.\n
                Underscore or dot can't be used multiple times in a row.\n
                Number of characters must be between 4 to 20.`)
                return
            case data.password == null || data.password == '':
                setError('Please enter a password')
                return
            case data.password.length > 72:
                setError('Please enter a shorter password (72 char. limit)')
                return
            case repassword == null || repassword == '':
                setError('Please re-enter your password')
                return
            case data.password !== repassword:
                setError("Passwords don't match")
                return
        }
        setSpinner(true)
        const result = await checkEmailUsername(data.email, data.username)
        if (result[0] != 0) {
            setError('Email is already in use')
            setSpinner(false)
            return
        }
        if (result[1] != 0) {
            setError('Username is already taken')
            setSpinner(false)
            return
        }
        setToken(result[2])
        setSpinner(false)
        setError('')
        setSecondStage(true)

    }

    const register = () => {
        if (data.gender < 0 || data.gender > 2) {
            setError("Please enter a valid gender, or leave blank if you're unsure")
            return
        }
        if (data.calorie_goal == '' || data.calorie_goal < 1) {
            setError('Please enter a valid calorie goal')
            return
        }
        if (data.weight_phase === '' || data.weight_phase < -1 || data.weight_phase > 1) {
            setError("Please enter a valid weight phase. Choose Maintenance if you're unsure")
            return
        }
        setSpinner(true)
        registerRequest(data, token)
            .then(() => {
                navigate('/login')
            }).catch(err => {
                setError(err.message)
            })
    }

    return (
        <div className={cookies.dark ? 'dark' : ''}>
            <div className="w-screen min-h-screen bg-stone-100 dark:bg-gray-950 py-16">
                <div className="border-double border-4 border-sky-500 dark:border-sky-600 p-4 rounded-md md:w-1/3 sm:w-96 max-w-full mx-auto text-stone-500 dark:text-white dark:shadow-[0px_0px_35px_-15px_#06b6d4]">

                    {!secondStage ? (
                        <>
                            <h2 className=" text-xl font-semibold">Register</h2>
                            <span>Already have an account? <Link to='/login'>Sign In</Link></span>
                            <div className="flex flex-wrap gap-4">
                                <div className="flex-1">
                                    <label htmlFor="firstname">First Name<span className="text-red-400">*</span></label><br />
                                    <input type="text" id="firstname" defaultValue={''} onChange={(e) => handleChange(e, 'first_name')} className="bg-transparent border border-stone-400 dark:border-gray-100 rounded-sm w-full h-10 px-2 mb-2 outline-none" required maxLength={60} />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="lastname">Last Name</label><br />
                                    <input type="text" id="lastname" defaultValue={''} onChange={(e) => handleChange(e, 'last_name')} className="bg-transparent border border-stone-400 dark:border-gray-100 rounded-sm w-full h-10 px-2 mb-2 outline-none" maxLength={60} />
                                </div>
                            </div>
                            <label htmlFor="email">Email<span className="text-red-400">*</span></label>
                            <input type="text" id="email" defaultValue={''} onChange={(e) => handleChange(e, 'email')} className="bg-transparent border border-stone-400 dark:border-gray-100 rounded-sm w-full h-10 px-2 mb-2 outline-none" required maxLength={255} />
                            <label htmlFor="username">Username<span className="text-red-400">*</span></label>
                            <input type="text" id="username" defaultValue={''} onChange={(e) => handleChange(e, 'username')} className="bg-transparent border border-stone-400 dark:border-gray-100 rounded-sm w-full h-10 px-2 mb-2 outline-none" required maxLength={20} />
                            <label htmlFor="password">Password<span className="text-red-400">*</span></label>
                            <input type="password" id="password" defaultValue={''} onChange={(e) => handleChange(e, 'password')} className="bg-transparent border border-stone-400 dark:border-gray-100 rounded-sm w-full h-10 px-2 mb-2 outline-none" required maxLength={72} />
                            <label htmlFor="repassword">Re-Enter Password<span className="text-red-400">*</span></label>
                            <input type="password" id="repassword" defaultValue={''} onChange={(e) => setRepassword(e.target.value)} className="bg-transparent border border-stone-400 dark:border-gray-100 rounded-sm w-full h-10 px-2 mb-2 outline-none" required maxLength={72} />
                            <div style={{ color: "red" }}>{error}</div>
                            <span className="inline-flex">
                                {!spinner ? (
                                    <button onClick={check} className="p-0.5 px-1 bg-sky-500/75 border-sky-500 border-4 rounded-md hover:bg-cyan-400/75 font-medium mr-2 text-white">Next</button>
                                ) : (
                                    <Spinner />
                                )}
                            </span>

                        </>
                    ) : (
                        <>
                            <div className="animate-fade">
                                <h2 className=" text-xl font-semibold">A few more questions...</h2>
                                <div className="flex flex-wrap gap-4 mb-3">
                                    <div className="flex-1">
                                        <label htmlFor="birthday">Birthday</label><br />
                                        <input type="date" id="birthday" defaultValue={''} onChange={(e) => handleChange(e, 'birthday')} className="bg-transparent border-stone-400 dark:border-gray-100 border rounded-sm w-full h-10 px-2 mb-2 outline-none" required maxLength={60} />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="gender">Gender</label><br />
                                        <select
                                            id="gender"
                                            defaultValue={""}
                                            onChange={(e) => { handleChange(e, 'gender') }}
                                            className="bg-transparent border-stone-400 dark:border-white border rounded-sm w-full h-10 px-2 mb-2 outline-none"
                                        >
                                            <option disabled value={""} className="text-neutral-700">Select...</option>
                                            <option value={0} className="text-neutral-700">Male</option>
                                            <option value={1} className="text-neutral-700">Female</option>
                                            <option value={2} className="text-neutral-700" >Other/Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    <div className="flex-1">
                                        <IoHelpCircleOutline onClick={() => { showCalculator(!calculator) }} className="inline text-2xl cursor-pointer" />

                                        <label htmlFor="calorie">Calorie Goal<span className="text-red-400">*</span></label><br />
                                        <input type="number" id="calorie" defaultValue={2000} onChange={(e) => handleChange(e, 'calorie_goal')} className="bg-transparent border-stone-400 dark:border-gray-100 border rounded-sm w-full h-10 px-2 mb-2 outline-none" required maxLength={60} inputmode="decimal" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="weightphase">Weight Phase<span className="text-red-400">*</span></label><br />
                                        <select
                                            id="weightphase"
                                            defaultValue={0}
                                            onChange={(e) => { handleChange(e, 'weight_phase') }}
                                            className="bg-transparent border border-stone-400 dark:border-white rounded-sm w-full h-10 px-2 outline-none"
                                        >
                                            <option value={1} className="text-neutral-700">Bulk</option>
                                            <option value={0} className="text-neutral-700">Maintenance</option>
                                            <option value={-1} className="text-neutral-700">Cut</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ color: "red" }}>{error}</div>
                                <span className="inline-flex">
                                    {!spinner ? (
                                        <button onClick={register} className="p-0.5 px-1 bg-sky-500/75 border-sky-500 border-4 rounded-md hover:bg-cyan-400/75 font-medium mr-2 text-white">Register</button>
                                    ) : (
                                        <Spinner />
                                    )}
                                </span>

                            </div>

                        </>
                    )}



                </div>
                {secondStage && calculator ? <CalCalulator /> : ''}
            </div>
        </div>
    )

}