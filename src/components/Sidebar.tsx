import {NAVIGATION_LINKS} from '@/constants/Navigation';
import supabase from '@/lib/supabase';
import {capitalizeAndRemoveHyphen} from '@/lib/utils';
import {Separator} from '@/components/ui/separator';
import React from 'react'
import LogoLink from './LogoLink';
import NavLink from './NavLink';

type Props = {}

const Sidebar = async (props: Props) => {
    const {data: categories} = await supabase.from('tools_categ').select('*');
    return (
        <div className="w-full md:w-64 bg-stone-800 border-r-[1px] border-stone-700 max-h-screen overflow-y-auto">
            <div className="p-4 h-[65px] border-b border-solid border-stone-700/75 mb-4 flex justify-between lg:block">
                <LogoLink />
                <div className="md:hidden flex items-center">
                    <button className="outline-none mobile-menu-button">
                        <svg className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                            x-show="!showMenu"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div>
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
            {/* mobile menu */}
            <div className="hidden mobile-menu">
                <ul className="">
                    <li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
                    <li><a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
                    <li><a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
                    <li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
