import React from 'react'
import Search from './Search'
import {Button} from './ui/button'
import SubmitATool from './SubmitATool'

type Props = {}

const Header = (props: Props) => {
    return (
        <div className="hidden md:flex items-center justify-end md:justify-between w-full border-b border-stone-700/75 h-[65px] p-2 px-2 md:px-4 bg-stone-800 lg:flex">
            <div className="hidden md:block">
                <Search />
            </div>
            {/* <a className="bg-emerald-700 text-sm py-2 px-5 hidden md:block lg:block rounded-md text-white hover:bg-emerald-800 transition-all ease-in-out" href="/login">Log In</a> */}
            <SubmitATool />
        </div>
    )
}

export default Header
