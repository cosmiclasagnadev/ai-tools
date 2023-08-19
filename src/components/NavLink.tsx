import {LucideIcon, Send} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export type NavLinkProps = {
    Icon?: LucideIcon;
    href: string;
    title: string;
}

const NavLink = ({Icon, href, title}: NavLinkProps) => {
    return (
        <Link href={href}>
            <div className="flex gap-2 transition-all ease-in-out items-center text-stone-500 hover:text-stone-200 hover:bg-stone-900 px-4 py-2">
                {Icon && <Icon size={20} />}
                <span className="text-sm">{title}</span>
            </div>
        </Link>
    )
}

export default NavLink
