import { React, useEffect, useState, useContext } from 'react'
import { readFoodRequest,addFoodRequest} from '../api/logging';
import Food from './parts/Food.jsx'
import Ping from './parts/Ping.jsx'
import { useQuery, useMutation } from 'react-query'
import moment from 'moment';
import { TokenContext } from '../App';


export default function AddMeal(){
    const [saved, setSaved] = useState(true)
    const [tempFood, setTempFood] = useState('')
    const [token] = useContext(TokenContext)
    const [date, setDate] = useState(
        moment().format('YYYY-MM-DD')
    );
    const [foods, setFoods] = useState([]);
    const totals = [foods?.map(food => food.c || 0), foods?.map(food => food.f || 0),foods?.map(food => food.p || 0),foods?.map(food => food.cal || 0)]

    const { isLoading, data: foodQuery, refetch, remove } = useQuery(
        ['food', date],
        () => readFoodRequest(date, token),
        {
            enabled: false, // Disable initial query execution
        }
    );

    //Detect change in any foods
    const handleFoodChange = (e, rowIndex, propName) => {
        const temp = foods.map((row, index) => {
          if (index == rowIndex) {
            if (propName !== "name"){
                return { ...row, [propName]: parseInt(e.target.value) };
            } 
            return { ...row, [propName]: e.target.value };
          }
          return row;
        });
        setFoods(temp);
        setSaved(JSON.stringify(temp) === JSON.stringify(tempFood))
    };

    const handleAutofill = (x, index) => {
        let temp = foods
        temp[index].c = x.c
        temp[index].f = x.f
        temp[index].p = x.p
        temp[index].cal = x.cal
        setFoods(temp);
        setSaved(JSON.stringify(temp) === JSON.stringify(tempFood))
    }

    //Removes the specified row
    const removeRow = (i) => {
        const temp = foods.filter((_, index) => index !== i);
        setFoods(temp);
        setSaved(JSON.stringify(temp) === JSON.stringify(tempFood))
    };

    //Add an empty food item
    const add = () => {
        const temp = [...foods, {}]
        setFoods(temp)
        setSaved(JSON.stringify(temp) === JSON.stringify(tempFood))
    };

    //Send the current data to the database
    const {mutate: saveData} = useMutation(() => {
        return addFoodRequest(date, foods, totals.map((total)=>{return total.reduce((acc, price) => acc + price, 0)}), token)
    })

    const save = () => {
        saveData()
        setSaved(true)
        setTempFood(foods)
    }

    //Clear the cache (prevent data crossover) and query the server
    useEffect(() => {
        remove();
        refetch();
        setSaved(true)
    }, [date]);

    // Rerender when foods is updated
    useEffect(() => {
        setFoods(foodQuery)
        setTempFood(foodQuery)
    }, [foodQuery]);

    const macros = ["Carbs: ", "Fats: ", "Protein: ", "Calories: "]

    return(
        <>
        <div className="p-5 text-stone-500 dark:text-white">Add food for:
            <input 
                type="date"
                className="bg-gray-50 border border-stone-400 dark:border-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            <div className="w-full md:max-w-5xl">
                    {isLoading || foods == null ? <div>loading...</div> : (
                        foods.map((food, index) => (
                            <Food 
                            key={index} 
                            size={foods.length}
                            food={food} 
                            index={index} 
                            handleFoodChange={handleFoodChange}
                            handleAutofill={handleAutofill}
                            removeRow={removeRow}></Food>
                        ))
                    )}
                    <div className="grid grid-cols-2 lg:grid-cols-7">
                        <div className="text-center col-span-2">Totals</div>
                        {totals.map((total, index) => (
                            <div key={index} className="text-center col-span-1"><span className="inline md:hidden">{macros[index]}</span>{total?.reduce((acc, price) => acc + price, 0)} {index==3?"cal":"g"}</div>
                        ))}
                    </div>
            </div>
            <span className="relative inline-flex mt-3 text-white">
                <button onClick={add} className="p-0.5 px-1 bg-sky-400/75 border-sky-400 border-4 rounded-md hover:bg-cyan-300/75 font-medium mr-2">Add Item</button>
                <button onClick={save} className="p-0.5 px-1 bg-sky-600/75 border-sky-600 border-4 rounded-md hover:bg-cyan-500/75 font-medium">Save</button>
                {!saved && <Ping/>}
            </span>
        </div>
        </>
    )
}