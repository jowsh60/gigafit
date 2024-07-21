import { React, useState, useEffect } from 'react'
import Spinner from './Spinner.jsx'
import { nutritionRequest, nutritionSearchRequest } from '../../api/external.js';
import { IoSearch, IoPencil } from "react-icons/io5";
import AsyncCreatableSelect from 'react-select/async-creatable';

export default function Food({ size, food, index, handleFoodChange, handleAutofill, removeRow, token }) {

    const [typingTimeout, setTypingTimeout] = useState(0);
    const [search, setSearch] = useState(JSON.stringify(food) === '{}')
    const [name, setName] = useState(food.name)

    const debounce = (event, callback) => {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        setTypingTimeout(setTimeout(async () => {
            if (event.length > 2) {
                callback(await foodSearch(event))
            }
        }, 1000));
    };

    const estimateCalories = () => {
        if (isNaN(food.cal)) {
            handleFoodChange({ target: { value: (food.c || 0) * 4 + (food.f || 0) * 9 + (food.p || 0) * 4 } }, index, 'cal')
        }
    }

    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    const getMacros = async (food, branded) => {
        let x = await nutritionRequest(token, food, branded)
        let y = x.foods[0]
        handleAutofill({ c: parseFloat(y.nf_total_carbohydrate.toFixed(1)), f: parseFloat(y.nf_total_fat.toFixed(1)), p: parseFloat(y.nf_protein.toFixed(1)), cal: parseFloat(y.nf_calories.toFixed(1)) }, index)
        handleFoodChange({ target: { value: name } }, index, 'name')
    }

    const foodSearch = async (name) => {
        let x = await nutritionSearchRequest(token, name)
        //Generic foods - Filter out duplicate ids
        let idSet = new Set()
        let generic = x.common.filter(obj => {
            if (!idSet.has(obj.tag_id)) {
                idSet.add(obj.tag_id);
                return true;
            }
            return false;
        }).map(obj => {
            return { label: toTitleCase(obj.food_name), value: obj.food_name, photo: obj.photo.thumb, branded: 0 };
        });

        //Branded Foods
        let branded = x.branded.map(obj => {
            return { label: obj.brand_name_item_name, value: obj.nix_item_id, photo: obj.photo.thumb, branded: 1 };
        });
        const groupedOptions = [
            {
                label: "Generic",
                options: generic
            },
            {
                label: "Branded",
                options: branded
            }
        ];
        return groupedOptions
    }


    return (
        <div className="w-full grid grid-cols-2 md:grid-cols-7 gap-2 flex items-center">
            <div className="col-span-2 mx-auto border-none py-4 flex items-center"><span>Food Item</span>
            {search ? (
                <AsyncCreatableSelect className="text-black w-48 ml-2 flex-1" id={`search${index}`}
                //inputValue={name}
                placeholder="Search..."
                defaultInputValue={name}
                onInputChange={(e) => { setName(e) }}
                onChange={(e) => { getMacros(e.value, e.branded); handleFoodChange({ target: { value: e.label } }, index, 'name'); setName(e.label) }}
                loadOptions={(inputValue, callback) => debounce(inputValue, callback)}
                formatOptionLabel={food => (
                    <div className="inline">
                        {/* <img src={food.photo} className="h-full" /> */}
                        <span>{food.label}</span>
                    </div>
                )}
            />
            ) : (
                <input type="text" className="mx-1 text-slate-800 w-44 rounded-sm h-6 pl-1 outline-none border border-stone-400 dark:border-0" value={food.name || ''} onChange={(e) => {handleFoodChange(e, index, 'name');setName(e.target.value)}}/>
            )}
            <button onClick={()=>setSearch(!search)}className="text-white bg-amber-400 hover:bg-amber-500 active:bg-amber-600 rounded-md p-1 text-lg">{search?<IoPencil/>:<IoSearch/>}</button>

            </div>
            <div className="col-span-1 text-center border-none py-4">Carbs(g) <input type="number" className="text-slate-800 w-14 rounded-sm h-6 pl-1 outline-none border border-stone-400 dark:border-0" value={food.c != undefined ? food.c : ''} onChange={(e) => handleFoodChange(e, index, 'c')} inputMode="decimal" /></div>
            <div className="col-span-1 text-center border-none py-4">Fat(g) <input type="number" className="text-slate-800 w-14 rounded-sm h-6 pl-1 outline-none border border-stone-400 dark:border-0" value={food.f != undefined ? food.f : ''} onChange={(e) => handleFoodChange(e, index, 'f')} inputMode="decimal" /></div>
            <div className="col-span-1 text-center border-none py-4">Protein(g) <input type="number" className="text-slate-800 w-14 rounded-sm h-6 pl-1 outline-none border border-stone-400 dark:border-0" value={food.p != undefined ? food.p : ''} onChange={(e) => handleFoodChange(e, index, 'p')} inputMode="decimal" /></div>
            <div className="col-span-1 text-center border-none py-4"><span onClick={estimateCalories} className="underline decoration-dotted hover:decoration-dashed cursor-pointer outline-none">Calories</span> <input type="number" className="border border-stone-400 dark:border-0 text-slate-800 w-16 rounded-sm h-6 pl-1" value={food.cal != undefined ? food.cal : ''} onChange={(e) => handleFoodChange(e, index, 'cal')} inputMode="decimal" /></div>
            {size > 1 && (
                <>
                    <div className="flex col-span-2 md:col-span-1 text-center border-none py-4"><button className="p-0.5 px-1 mx-auto bg-transparent border-rose-700 border-2 rounded-md hover:border-rose-600 font-medium text-rose-700" onClick={() => removeRow(index)}>Remove</button></div>
                    <div className="col-span-2 px-4 my-3 border-b border-white md:hidden"></div>
                </>
            )}


        </div>
    )
}