"use client"

import React from 'react'
import {Input} from './ui/input'
import {useRouter} from 'next/navigation'
import {Button} from './ui/button'

type Props = {}

const Search = (props: Props) => {
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const router = useRouter();

    // redirect to search page with string in search bar as query param
    const handleSearch = (e: any) => {
        e.preventDefault();
        router.push(`/search?query=${searchQuery}`);
    }

    return (
        <div className="flex gap-2 w-full md:w-fit">
            <Input
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                type="search"
                placeholder="🔍 Search..."
                className="md:w-[300px] lg:w-[300px] bg-stone-700 bg-opacity-75 border-stone-700 border-opacity-75 border-2 rounded-md p-2 text-white"
            />
            <Button onClick={handleSearch}>Search</Button>
        </div>
    )
}

export default Search
