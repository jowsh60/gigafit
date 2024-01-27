import React from 'react'

export default function DayLogger(){
    return(
        <div className="p-5 text-gray-100">Log Day For:
        <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
        <div className="flex flex-row flex-wrap break-inside-auto">
            <div className="mr-6 border-none py-4">Hours Slept: <input type="number" className="text-slate-800 w-10 rounded-sm h-6" /> hrs</div>
            <div className="mr-6 border-none py-4">Sleep Quality: <input type="number" className="text-slate-800 w-10 rounded-sm h-6" /> /10</div>
            <div className="mr-6 border-none py-4">Nap: <input type="number" className="text-slate-800 w-10 rounded-sm h-6" /> hrs</div>
            <div className="mr-6 border-none py-4">Morning Wt: <input type="number" className="text-slate-800 w-12 rounded-sm h-6" /> lbs</div>
            <div className="mr-6 border-none py-4">Night Wt: <input type="number" className="text-slate-800 w-12 rounded-sm h-6" /> lbs</div>
            <div className="mr-6 border-none py-4">Workout Quality: <input type="number" className="text-slate-800 w-10 rounded-sm h-6" /> /10</div>
            <div className="mr-6 border-none py-4">Perceived Happiness: <input type="number" className="text-slate-800 w-10 rounded-sm h-6" /> /10</div>   
        </div>

        <button className="p-0.5 px-1 bg-sky-600/75 border-sky-600 border-4 rounded-md hover:bg-cyan-500/75 font-medium">Save</button>
    </div>
    )
}