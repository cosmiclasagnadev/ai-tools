import Link from 'next/link'
import React from 'react'
import {Separator} from './ui/separator'
import {Send} from 'lucide-react';
import {NAVIGATION_LINKS} from '@/constants/Navigation';
import NavLink from './NavLink';
import LogoLink from './LogoLink';
import supabase from '@/lib/supabase';
import {capitalizeAndRemoveHyphen} from '@/lib/utils';

type Props = {
    children: React.ReactNode
}

const MainSideNav = async ({children}: Props) => {
    const {data: categories} = await supabase.from('tools_categ').select('*');

    return (
        <div className="flex">
            <div className="w-64 bg-stone-800 border-r-[1px] border-stone-700">
                <div className="p-4">
                    <LogoLink />
                </div>
                <Separator className="bg-stone-700 bg-opacity-75 mt-2 mb-5" />
                <nav>
                    <ul>
                        {NAVIGATION_LINKS.map((link) => (
                            <li key={link.title}>
                                <NavLink Icon={link.Icon} href={link.href} title={link.title} />
                            </li>
                        ))
                        }
                    </ul>
                </nav>
                <Separator className="bg-stone-700 bg-opacity-75 mt-5 mb-3" />
                <span className="font-bold px-4 py-2 text-stone-100 text-sm">Categories</span>
                <nav>
                    <ul className="mt-2">
                        {categories?.map((category) => (
                            <li key={category.unnest}>
                                <NavLink href={`/categories/${category.category}`} title={capitalizeAndRemoveHyphen(category.category)} count={category.count} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            {children}
        </div>
    )
}

export default MainSideNav
