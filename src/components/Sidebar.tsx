import {NAVIGATION_LINKS} from '@/constants/Navigation';
import supabase from '@/lib/supabase';
import {capitalizeAndRemoveHyphen} from '@/lib/utils';
import {Separator} from '@/components/ui/separator';
import React from 'react'
import LogoLink from './LogoLink';
import NavLink from './NavLink';
import {MobileMenuSlideOut} from './MobileMenuSlideOut';
import SubmitATool from './SubmitATool';

type Props = {}

const Sidebar = async (props: Props) => {
    const {data: categories} = await supabase.from('tools_categ').select('*');
    return (
        <div className="w-full md:w-64 bg-stone-800 border-r-[0px] md:border-r-[1px] border-stone-700 overflow-y-auto">
            <div className="p-4 h-[65px] border-b border-solid border-stone-700/75 md:mb-4 flex justify-between md:block">
                <LogoLink />
                <div className="md:hidden flex items-center">
                    <SubmitATool />
                    <MobileMenuSlideOut categories={categories} />
                </div>
            </div>
            <div className="hidden md:block">
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
                <Separator className="bg-stone-700 bg-opacity-75 mt-5 mb-5" />
                <span className="font-bold px-4 py-2 text-stone-100 text-sm">Categories</span>
                <nav className="border-b border-solid border-stone-700/75 md:border-b-0">
                    <ul className="mt-2">
                        {categories?.map((category) => (
                            <li key={category.unnest}>
                                <NavLink href={`/categories/${category.category}`} title={capitalizeAndRemoveHyphen(category.category)} count={category.count} />
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
