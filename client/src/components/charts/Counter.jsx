import { React, useEffect, useState, useContext } from 'react'
import { useQuery } from 'react-query'
import { TokenContext } from '../../App';
import { counterRequest } from '../../api/graphing'
import { FiChevronUp, FiChevronDown, FiMinus } from "react-icons/fi";
import moment from 'moment-timezone'

export default function Counter() {
    const [token] = useContext(TokenContext)

    const { isLoading, data: counterQuery } = useQuery(
        'counter',
        () => counterRequest(moment().format('YYYY-MM-DD'), token)
    );
    return (
        <>
            <span className="font-semibold mx-2">Net Calorie History</span>
            {isLoading || counterQuery == null ? 'loading...' : (
                <>

                    <table className="w-full">
                        <thead className="text-stone-700 bg-stone-400 dark:text-white dark:bg-gray-950">
                            <tr>
                                <th className="border-slate-700 text-left">Date</th>
                                <th className="border-slate-700 text-right">Goal</th>
                                <th className="border-slate-700 text-right">Consumed</th>
                                <th className="border-slate-700 text-right">Net</th>
                            </tr>
                        </thead>
                        <tbody>
                            {counterQuery.length > 0 ? counterQuery.map((day, index) => {
                                const date = moment(day.date)
                                let diff = day.totals.cal - day.calorie_goal
                                let textColor = "text-amber-500 dark:text-yellow-400" //Maintenance by default
                                let bColor = "border-r-amber-500 dark:border-r-yellow-400"
                                if (diff * day.weight_phase > 0){
                                    //Calorie diff align with phase, good
                                    textColor = "text-green-600 dark:text-green-500"
                                    bColor = "border-r-green-600 dark:border-r-green-500"
                                } 
                                if (diff * day.weight_phase < 0){
                                    //Calorie diff doesnt align with phase, bad
                                    textColor = "text-red-600 dark:text-red-500"
                                    bColor = "border-r-red-600 dark:border-r-red-500"
                                } 
                                return(
                                <tr key={index} className="odd:bg-stone-300/75 dark:odd:bg-slate-900">
                                    <td className="border-slate-700 font-medium text-left w-1/4">
                                        <span className={"border-r-4 w-0 mr-2 " + bColor}></span>
                                        {date.utc().format('MM/DD/YYYY')}</td>
                                    <td className="border-slate-700 text-right w-1/4">{day.calorie_goal}</td>
                                    <td className={"border-slate-700 text-right w-1/4 " + textColor}>{day.totals.cal.toFixed(0)}</td>
                                    <td className={"border-slate-700 text-right w-1/4 whitespace-nowrap " + textColor}>
                                        {diff.toFixed(0)}
                                        {diff > 0 ? <FiChevronUp className="inline text-lg" />: diff < 0 ? <FiChevronDown className="inline text-lg" />: <FiMinus className="inline text-lg" />}
                                    </td>
                                </tr>
                                )

                            }) : <></>}
                        </tbody>

                    </table>
                </>
            )}
        </>
    )
}