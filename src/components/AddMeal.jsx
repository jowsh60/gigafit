import React from 'react'

export default function AddMeal(){
    return(
        <>
        <div className="p-5 text-gray-100">Add meal for:
            <input type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
            <table >
                <tbody >
                    <tr >
                        <td className="border-none py-4">Food Item <input type="text" className="text-slate-800 w-48 rounded-sm h-6" /></td>
                        <td className="border-none py-4">Carbs <input type="number" className="text-slate-800 w-10 rounded-sm h-6" /> g</td>
                        <td className="border-none py-4">Protein <input type="number" className="text-slate-800 w-10 rounded-sm h-6" /> g</td>
                        <td className="border-none py-4">Fat <input type="number" className="text-slate-800 w-10 rounded-sm h-6" /> g</td>
                        <td className="border-none py-4">Calories <input type="number" className="text-slate-800 w-16 rounded-sm h-6" /></td>   
                    </tr>
                </tbody>
            </table>
            <button className="p-0.5 px-1 bg-sky-400/75 border-sky-400 border-4 rounded-md hover:bg-cyan-300/75 font-medium mr-2">Add Item</button>
            <button className="p-0.5 px-1 bg-sky-600/75 border-sky-600 border-4 rounded-md hover:bg-cyan-500/75 font-medium">Save</button>
        </div>
        </>
    )
}