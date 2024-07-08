import {React, useState, useEffect} from 'react'
import { useQuery } from 'react-query'
import Spinner from './Spinner.jsx'
import { nutritionRequest } from '../../api/external.js';
import { IoSearch } from "react-icons/io5";


export default function Food({size, food, index, handleFoodChange, handleAutofill, removeRow}){

    const estimateCalories = () => {
        if(isNaN(food.cal)){
            handleFoodChange({target:{value:(food.c || 0)*4 + (food.f ||0)*9 + (food.p||0)*4}}, index, 'cal')
        }
    }

    const { isLoading, data: foodQuery, refetch, remove } = useQuery(
        ['macro', food.name],
        () => nutritionRequest(food.name),
        {
            enabled: false, // Disable initial query execution
        }
    );

    const getMacros = () => {
        if(food.name != undefined && food.name !== '' && food.name != null){
            remove()
            refetch()
        }
    }

    useEffect(() => {
        if(foodQuery != null){
            console.log(foodQuery)
            // if(foodQuery.length){
            //     let totals = {c:0,f:0,p:0,cal:0}
            //     foodQuery.forEach(food => {
            //         totals.c += food.carbohydrates_total_g
            //         totals.f += food.fat_total_g
            //         totals.p += food.protein_g
            //         totals.cal += food.calories

            //     })
            //     handleAutofill(totals, index)
            //     handleFoodChange({target:{value:food.name}}, index, 'name')//refresh name to populate cells
            // }
        }
    }, [foodQuery]);

    return (
    <div className="w-full grid grid-cols-2 md:grid-cols-7 gap-2">
        <div className="col-span-2 mx-auto border-none py-4 flex items-center">Food Item
            <input type="text" className="mx-1 text-slate-800 w-44 rounded-sm h-6 pl-1 outline-none border border-stone-400 dark:border-0" value={food.name || ''} onChange={(e) => handleFoodChange(e, index, 'name')}/>
            {isLoading ? (<Spinner/>): (<button className="text-white bg-amber-400 hover:bg-amber-500 rounded-md p-1 text-lg"><IoSearch/></button>) }
        </div>
        <div className="col-span-1 text-center border-none py-4">Carbs(g) <input type="number" className="text-slate-800 w-14 rounded-sm h-6 pl-1 outline-none border border-stone-400 dark:border-0" value={food.c != undefined ? food.c : ''} onChange={(e) => handleFoodChange(e, index, 'c')} inputMode="decimal"/></div>
        <div className="col-span-1 text-center border-none py-4">Fat(g) <input type="number" className="text-slate-800 w-14 rounded-sm h-6 pl-1 outline-none border border-stone-400 dark:border-0" value={food.f != undefined ? food.f : ''} onChange={(e) => handleFoodChange(e, index, 'f')} inputMode="decimal"/></div>
        <div className="col-span-1 text-center border-none py-4">Protein(g) <input type="number" className="text-slate-800 w-14 rounded-sm h-6 pl-1 outline-none border border-stone-400 dark:border-0" value={food.p  != undefined ? food.p: ''} onChange={(e) => handleFoodChange(e, index, 'p')} inputMode="decimal"/></div>
        <div className="col-span-1 text-center border-none py-4"><span onClick={estimateCalories} className="underline decoration-dotted hover:decoration-dashed cursor-pointer outline-none">Calories</span> <input type="number" className="border border-stone-400 dark:border-0 text-slate-800 w-16 rounded-sm h-6 pl-1" value={food.cal != undefined? food.cal : ''} onChange={(e) => handleFoodChange(e, index, 'cal')} inputMode="decimal"/></div> 
        {size > 1 && (
            <>
            <div className="flex col-span-2 md:col-span-1 text-center border-none py-4"><button className="p-0.5 px-1 mx-auto bg-transparent border-rose-700 border-2 rounded-md hover:border-rose-600 font-medium text-rose-700" onClick={() => removeRow(index)}>Remove</button></div>
            <div className="col-span-2 px-4 my-3 border-b border-white md:hidden"></div>
            </>
          )}  


    </div>
    )
}