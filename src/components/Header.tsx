import React from 'react'
import Search from './Search'
import {Button} from './ui/button'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className="flex items-center justify-between w-full border-b border-stone-700/75 h-[65px] p-2 px-2 md:px-4 bg-stone-800">
            <Search />
            <Button className="bg-emerald-700 py-1 px-5">Log In</Button>
        </div>
    )
}

export default Header
