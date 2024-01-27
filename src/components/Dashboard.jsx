import React from 'react'
import {Link} from 'react-router-dom'
import Graph from './Graph.jsx'
import Counter from './Counter.jsx'

export default function Dashboard(){
    return(
        <div id="container" className="p-5 w-full text-gray-100 ">
            {/* <div className="flex flex-wrap">
            this is dashboard 
            <Link to="products" className="underline">Add a workout</Link>
            </div> */}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                <div className="col-span-2 border-[3px] border-gray-100 rounded-xl"><Graph/></div>
                <div className="lg:col-span-1 md:col-span-2 h-[255px] border-[3px] border-gray-100 rounded-xl overflow-scroll"><Counter/></div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="col-span-1 h-[150px] border-[3px] border-gray-100 rounded-xl">Recent workouts</div>
                <div className="col-span-1 h-[150px] border-[3px] border-gray-100 rounded-xl">Recent meals</div>
            </div>
        </div>
    )
}
