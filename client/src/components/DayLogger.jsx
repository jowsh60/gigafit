import { React, useEffect, useState, useContext } from 'react'
import { readDayRequest, addDayRequest } from '../api/logging';
import Ping from './parts/Ping.jsx'
import { useQuery, useMutation } from 'react-query'
import moment from 'moment';
import { TokenContext } from '../App';

export default function DayLogger(){
    const [saved, setSaved] = useState(true)
    const [tempDay, setTempDay] = useState('')
    const [token] = useContext(TokenContext)
    const [date, setDate] = useState(
        moment().format('YYYY-MM-DD')
    );
    const [day, setDay] = useState({});
    
    const { isLoading, data: dayQuery, refetch, remove } = useQuery(
        ['day',date],
        () => readDayRequest(date, token),
        {
            enabled: false, // Disable initial query execution
        }
    );

    const handleChange = (e, inputName) => {
        const temp = {...day, [inputName]: (e.target.value===''||e.target.value==null||isNaN(e.target.value)?null:Number(e.target.value)) }
        setDay(temp);
        setSaved(JSON.stringify(temp) === JSON.stringify(tempDay))
    };

    //Send the current data to the database
    const {mutate: saveData} = useMutation(() => {
        return addDayRequest(date, day, token)
    })

    const save = () => {
        saveData()
        setSaved(true)
        setTempDay(day)
    }

    //Clear the cache (prevent data crossover) and query the server
    useEffect(() => {
        remove();
        refetch();
        setSaved(true)
    }, [date]);

    useEffect(() => {
        setDay(dayQuery)
        setTempDay(dayQuery)
    }, [dayQuery]);

    return(
        <div className="p-5 text-stone-500 dark:text-white">Log Day For:
            <input 
                type="date"
                className="bg-gray-50 border border-stone-400 dark:border-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        {isLoading || day == null ? 'loading...': (
        <>
            <div className="border-none py-4">Hours Slept: <input type="number" onChange={(e)=>{handleChange(e, 'hours_slept')}} defaultValue={day?.hours_slept || ''} className="text-slate-800 w-14 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" inputMode="decimal"/> hrs</div>
            <div className="border-none py-4">Sleep Quality: <input type="number" onChange={(e)=>{handleChange(e, 'sleep_quality')}} defaultValue={day?.sleep_quality || ''} className="text-slate-800 w-14 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" inputMode="decimal"/> /10</div>
            <div className="border-none py-4">Morning Wt: <input type="number" onChange={(e)=>{handleChange(e, 'morning_weight')}} defaultValue={day?.morning_weight || ''} className="text-slate-800 w-20 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" inputMode="decimal"/> lbs</div>
            <div className="border-none py-4">Night Wt: <input type="number" onChange={(e)=>{handleChange(e, 'night_weight')}} defaultValue={day?.night_weight || ''} className="text-slate-800 w-20 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" inputMode="decimal"/> lbs</div>
            <div className="border-none py-4">Workout Quality: <input type="number" onChange={(e)=>{handleChange(e, 'workout_quality')}} defaultValue={day?.workout_quality || ''} className="text-slate-800 w-14 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" inputMode="decimal"/> /10</div>
            <div className="border-none py-4">Perceived Happiness: <input type="number" onChange={(e)=>{handleChange(e, 'perceived_happiness')}} defaultValue={day?.perceived_happiness || ''} className="text-slate-800 w-14 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" inputMode="decimal"/> /10</div>   
            <div className="border-none py-4">Calorie Goal: <input type="number" onChange={(e)=>{handleChange(e, 'calorie_goal')}} defaultValue={day?.calorie_goal} className="text-slate-800 w-20 rounded-sm h-6 pl-1 border border-stone-400 dark:border-0" inputMode="decimal"/> cal</div>
            <div className="">
            Weight Phase: <select
                defaultValue={day?.weight_phase}
                onChange={(e)=>{handleChange(e, 'weight_phase')}}
                className="bg-transparent border border-stone-400 dark:border-white rounded-sm h-10 px-2 outline-none"
            >
                <option value={1}>Bulk</option>
                <option value={0}>Maintenance</option>
                <option value={-1}>Cut</option>
            </select>
            </div>
            <span className="relative inline-flex mt-3 text-white">
                <button onClick={save} className="p-0.5 px-1 bg-sky-600/75 border-sky-600 border-4 rounded-md hover:bg-cyan-500/75 font-medium">Save</button>
                {!saved && <Ping/>}
            </span>


        </>
        )}


    </div>
    )
}