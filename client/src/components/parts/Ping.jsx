import React from 'react'

export default function Ping(){
    return (
    <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 dark:bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 dark:bg-emerald-500"></span>
    </span>
    )
}
