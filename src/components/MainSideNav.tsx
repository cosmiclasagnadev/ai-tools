import Link from 'next/link'
import React from 'react'
import {Separator} from './ui/separator'
import {Send} from 'lucide-react';
import {NAVIGATION_LINKS} from '@/constants/Navigation';
import NavLink from './NavLink';
import LogoLink from './LogoLink';
import supabase from '@/lib/supabase';

type Props = {
    children: React.ReactNode
}

const MainSideNav = async ({children}: Props) => {
    const {data: categories} = await supabase.from('categ').select('*');
    const capitalizeAndRemoveHyphen = (str: string) => {
        return str.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    }

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
                <Separator className="bg-stone-700 bg-opacity-75 mb-4" />
                <span className="font-bold p-3 text-stone-100">Categories</span>
                <ul className="mt-2">
                    {categories?.map((category) => (
                        <li key={category.unnest}>
                            <NavLink href={`/category/${category.unnest}`} title={capitalizeAndRemoveHyphen(category.unnest)} />
                        </li>
                    ))}
                </ul>
            </div>
            {children}
        </div>
    )
}

export default MainSideNav
