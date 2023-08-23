import React from 'react'
import Search from './Search'
import {Button} from './ui/button'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className="flex items-center justify-between w-full border-b border-stone-700/75 h-[65px] p-2 px-2 md:px-4 bg-stone-800 md:flex lg:flex">
            <Search />
            <a className="bg-emerald-700 text-sm py-2 px-5 hidden md:block lg:block rounded-md text-white hover:bg-emerald-800 transition-all ease-in-out" href="/login">Log In</a>
        </div>
    )
}

export default Header
