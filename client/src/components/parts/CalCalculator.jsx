import React, { useState } from 'react'

export default function CalCalulator() {

    const [age, setAge] = useState(null)
    const [gender, setGender] = useState(null)
    const [feet, setFeet] = useState(null)
    const [inches, setIn] = useState(null)
    const [weight, setWeight] = useState(null)
    const [bfp, setBFP] = useState(null)
    const [activity, setActivity] = useState(null)
    const [result, setResult] = useState(null)

    const calc = () => {
        if (age && gender && feet && inches && weight && activity) {
            if (bfp) {
                setResult((370 + 21.6 * ((1 - (bfp / 100)) * weight * 0.453592)) * activity) //Katch-McArdle Formula
            } else {
                
                setResult(((10 * weight * 0.453592) + (6.25 * (feet * 12 + inches) * 2.54) - (5 * age) + gender) * activity) //Mifflin - St Jeor Equation
            }
        } else {

        }

    }


    return (
        <div className="mt-8 border-double border-4 border-emerald-500 p-4 rounded-md md:w-1/3 sm:w-96 max-w-full mx-auto text-stone-500 dark:text-white dark:shadow-[0px_0px_35px_-15px_#06bc61]">
            <h2 className=" text-lg font-medium">Calorie Goal Calculator</h2>
            <div className="flex flex-wrap gap-4 mb-3">
                <div className="flex-1">
                    <label htmlFor="age">Age (15-80)<span className="text-red-400">*</span></label><br />
                    <input
                        type="number"
                        id="age"
                        defaultValue={""}
                        onChange={(e) => { setAge(parseInt(e.target.value) || null) }}
                        className="bg-transparent border-stone-400 dark:border-gray-100 border rounded-sm w-full h-10 px-2  outline-none" required maxLength={60} />
                </div>
                <div className="flex-1">
                    <label htmlFor="gender">Gender<span className="text-red-400">*</span></label><br />
                    <select
                        id="gender"
                        defaultValue={""}
                        onChange={(e) => { setGender(parseInt(e.target.value)) }}
                        className="bg-transparent border-stone-400 dark:border-white border rounded-sm w-full h-10 px-2  outline-none"
                    >
                        <option disabled value={""} className="text-neutral-700">Select...</option>
                        <option value={5} className="text-neutral-700">Male</option>
                        <option value={-161} className="text-neutral-700">Female</option>
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap gap-4">
                <div className="flex-1">
                    <label htmlFor="height">Height<span className="text-red-400">*</span></label><br />
                    <input type="text" id="height"
                        defaultValue={""}
                        onChange={(e) => { setFeet(parseInt(e.target.value) || null) }}
                        className="bg-transparent border-stone-400 dark:border-gray-100 border rounded-sm w-1/2 h-10 px-2  outline-none" required maxLength={60} />
                    <span className="-ml-6">ft.</span>
                    <input type="text"
                        defaultValue={""}
                        onChange={(e) => { setIn(parseInt(e.target.value) || null) }}
                        className="ml-2 bg-transparent border-stone-400 dark:border-gray-100 border rounded-sm w-1/2 h-10 px-2  outline-none" required maxLength={60} />
                    <span className="-ml-6">in.</span>
                </div>
                <div className="flex-1">
                    <label htmlFor="weight">Weight<span className="text-red-400">*</span></label>
                    <label className="float-right text-sm" htmlFor="bfp">Body Fat (opt.)</label><br />
                    <input type="text" id="weight"
                        defaultValue={""}
                        onChange={(e) => { setWeight(parseInt(e.target.value) || null) }}
                        className="bg-transparent border-stone-400 dark:border-gray-100 border rounded-sm w-1/2 h-10 px-2  outline-none" required maxLength={60} />
                    <span className="-ml-8">lbs.</span>
                    <input type="text" id="bfp"
                        defaultValue={""}
                        onChange={(e) => { setBFP(parseFloat(e.target.value) || null) }}
                        className="ml-1 bg-transparent border-stone-400 dark:border-gray-100 border rounded-sm w-1/2 h-10 px-2  outline-none" required maxLength={60} />
                    <span className="-ml-6">%</span>
                </div>
                <div className="w-full">
                    <label htmlFor="activity">Physical Activity<span className="text-red-400">*</span></label>
                    <select
                        id="activity"
                        defaultValue={""}
                        onChange={(e) => { setActivity(parseFloat(e.target.value)) }}
                        className="bg-transparent border border-stone-400 dark:border-white rounded-sm w-full h-10 px-2 outline-none"
                    >
                        <option disabled value={""} className="text-neutral-700">Select...</option>
                        <option value={1.2} className="text-neutral-700">Sedentary: Little to no exercise</option>
                        <option value={1.375} className="text-neutral-700">Light: Exercise 1-3x per week week</option>
                        <option value={1.55} className="text-neutral-700">Moderate: Exercise 4-5x per week</option>
                        <option value={1.725} className="text-neutral-700">Active: Daily Exercise / Intense Exercise 3-4x per week</option>
                        <option value={1.9} className="text-neutral-700">Very Active: Intense exercise 6-7x per week</option>
                    </select>
                </div>

            </div>
            <button onClick={calc} className="mt-2 p-0.5 px-1 bg-emerald-500/75 border-emerald-500 border-4 rounded-md hover:bg-green-400/75 font-medium mr-2 text-white">Calculate</button>
            {result ? (
                <table className="w-full">
                    <thead>
                        <tr>
                            <th>Weight goal</th>
                            <th>Calories/day</th>
                        </tr>

                    </thead>
                    <tbody>
                        <tr>
                            <td>Bulk (Weight Gain)</td>
                            <td>{(result* 1.2).toFixed(0)} Cals/day</td>
                        </tr>
                        <tr>
                            <td>Maintainence (Maintain Weight)</td>
                            <td>{result.toFixed(0)} Cals/day</td>
                        </tr>
                        <tr>
                            <td>Cut (Weight loss)</td>
                            <td>{(result* 0.8).toFixed(0)} Cals/day</td>
                        </tr>
                    </tbody>
                </table>
            ) : ''}
        </div>
    )
}