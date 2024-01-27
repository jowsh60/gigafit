import React from 'react'
import { LuUser2 } from "react-icons/lu";

export default function Header(){
    return(
        <div className="bg-slate-950 flex flex-row text-white border-b-2 border-gray-100">
            <div className="flex-1">
                <div className="flex flex-row w-30 ">
                    <div className="flex-initial px-3 h-[60px] leading-[60px] align-middle font-semibold border-r border-gray-400 ">Total Workouts<span className="ml-3 font-light text-slate-400">184</span></div>
                    <div className="flex-initial px-3 h-[60px] leading-[60px] align-middle font-semibold border-r border-gray-400 ">Total Weight Lifted<span className="ml-3 font-light text-slate-400">1864520 lbs.</span></div>
                </div>
            </div>
            <div className="py-1 px-2 bg-slate-400 bg-opacity-50 rounded-lg my-auto mr-4 font-medium hover:bg-slate-300 hover:bg-opacity-50 cursor-pointer"><LuUser2 className="inline"/> Account</div>
        </div>
    )
}