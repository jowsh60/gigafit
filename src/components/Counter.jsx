import React from 'react'
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

export default function Counter(){
    return(
        <>
        <span className="font-semibold mx-2">Calorie counter</span>
        <table className="w-full">
        <thead className="bg-slate-950">
            <tr>
                <th className="border-slate-700 text-left">Date</th>
                <th className="border-slate-700 text-right">Goal</th>
                <th className="border-slate-700 text-right">Consumed</th>
                <th className="border-slate-700 text-right">Net</th>
            </tr>
        </thead>
        <tbody>
            <tr className="odd:bg-slate-900">
                <td className="border-slate-700 font-medium text-left w-1/4">
                    <span className="border-r-4 border-r-green-500 w-0 mr-2"></span>
                    1/19/2024</td>
                <td className="border-slate-700 text-right w-1/4">3,150</td>
                <td className="border-slate-700 text-right w-1/4 text-green-500">3,463</td>
                <td className="border-slate-700 text-right w-1/4 text-green-500 whitespace-nowrap">
                    313
                    <LuChevronUp className="inline text-lg"/></td>
            </tr>
            <tr className="odd:bg-slate-900">
                <td className="border-slate-700 font-medium text-left w-1/4">
                    <span className="border-r-4 border-r-red-500 w-0 mr-2"></span>
                    1/18/2024</td>
                <td className="border-slate-700 text-right w-1/4">3,150</td>
                <td className="border-slate-700 text-right w-1/4 text-red-500">3,008</td>
                <td className="border-slate-700 text-right w-1/4 text-red-500 whitespace-nowrap">
                    -142
                    <LuChevronDown className="inline text-lg"/></td>
            </tr>
            <tr className="odd:bg-slate-900">
                <td className="border-slate-700 font-medium text-left w-1/4">
                    <span className="border-r-4 border-r-red-500 w-0 mr-2"></span>
                    1/17/2024</td>
                <td className="border-slate-700 text-right w-1/4">3,150</td>
                <td className="border-slate-700 text-right w-1/4 text-red-500">3,071</td>
                <td className="border-slate-700 text-right w-1/4 text-red-500 whitespace-nowrap">
                    <span>-78</span>
                    <LuChevronDown className="inline text-lg"/></td>
            </tr>
            <tr className="odd:bg-slate-900">
                <td className="border-slate-700 font-medium text-left w-1/4">
                    <span className="border-r-4 border-r-green-500 w-0 mr-2"></span>
                    1/15/2024</td>
                <td className="border-slate-700 text-right w-1/4">3,005</td>
                <td className="border-slate-700 text-right w-1/4 text-green-500">3,163</td>
                <td className="border-slate-700 text-right w-1/4 text-green-500 whitespace-nowrap">
                    <span>158</span>
                    <LuChevronUp className="inline text-lg"/></td>
            </tr>
        </tbody>

        </table>
        </>
    )
}