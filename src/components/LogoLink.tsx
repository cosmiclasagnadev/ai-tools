import React from 'react'
import {Brain} from 'lucide-react'
import Link from 'next/link'
type Props = {}

const LogoLink = (props: Props) => {
    return (
        <Link href="/" className="group flex gap-2 items-center">
            <Brain size="24" className="group-hover:rotate-45 transition-all ease-in-out text-emerald-600" />
            <span className="group-hover:scale-[1.05] transition-all ease-in-out font-bold text-lg text-white">AITools</span>
        </Link>
    )
}

export default LogoLink
