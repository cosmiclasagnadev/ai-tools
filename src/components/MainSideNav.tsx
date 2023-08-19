import Link from 'next/link'
import React from 'react'
import {Separator} from './ui/separator'
import {Send} from 'lucide-react';
import {NAVIGATION_LINKS} from '@/constants/Navigation';
import NavLink from './NavLink';
import LogoLink from './LogoLink';

type Props = {
    children: React.ReactNode
}

const MainSideNav = ({children}: Props) => {
    return (
        <div className="flex">
            <div className="w-64 bg-stone-800 border-r-[1px] border-stone-700">
                <div className="p-4">
                    <LogoLink />
                </div>
                <Separator className="bg-stone-700 bg-opacity-75" />
                <ul>
                    {NAVIGATION_LINKS.map((link) => (
                        <li key={link.title}>
                            <NavLink Icon={link.Icon} href={link.href} title={link.title} />
                        </li>
                    ))
                    }
                </ul>
            </div>
            {children}
        </div>
    )
}

export default MainSideNav
