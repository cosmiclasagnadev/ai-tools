import React from 'react'
import {Input} from './ui/input'

type Props = {}

const Search = (props: Props) => {
    return (
        <div>
            <Input
                type="search"
                placeholder="🔍 Search..."
                className="md:w-[100px] lg:w-[300px] bg-stone-700 bg-opacity-75 border-stone-700 border-opacity-75 border-2 rounded-md p-2 text-white"
            />
        </div>
    )
}

export default Search
