import React from 'react'
import {Skeleton} from './ui/skeleton'

type Props = {}

const Loader = (props: Props) => {
    return (
        <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[200px] w-full bg-stone-800" />
            <Skeleton className="h-[200px] w-full bg-stone-800" />
            <Skeleton className="h-[200px] w-full bg-stone-800" />
        </div>
    )
}

export default Loader
