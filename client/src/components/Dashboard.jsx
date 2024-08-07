import React from 'react'
import {Link} from 'react-router-dom'
import Graph from './charts/Graph.jsx'
import Macros from './charts/Macros.jsx'
import Counter from './charts/Counter.jsx'

export default function Dashboard(){
    return(
        <div id="container" className="p-5 w-full text-stone-500 dark:text-white">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-2 border-2 border-stone-400 dark:border-gray-100 rounded-xl"><Graph/></div> 
                <div className="col-span-2 lg:col-span-1 h-[270px] lg:h-[385px] border-2 border-stone-400 dark:border-gray-100 rounded-xl overflow-scroll no-scrollbar"><Counter/></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="col-span-1 border-2 border-stone-400 dark:border-gray-100 rounded-xl">Today's Progress:<br/><Macros /></div>
                <div className="col-span-1 border-2 border-stone-400 dark:border-gray-100 rounded-xl">
                Current to do list:
                <ol>
                    <li>1. Campaigns: Personalized Week Long Weight Missions {'- October 2024'}</li>
                    <li>2. Workout tracker {'- December 2024'}</li>
                    <li>4. Advanced graphing settings {'- Spring 2025'}</li>
                    <li>5. Social feature {'- Summer 2025'}</li>
                    <li>3. Integration with other fitness apps (Hevy/Strong, Apple Health) {'- Spring 2025'}</li>
                    <li>6. Standalone iOS App {'- 2026'} </li>
                </ol>
                </div>
            </div>
        </div>
    )
}


