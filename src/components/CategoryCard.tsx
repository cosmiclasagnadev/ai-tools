import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {capitalizeAndRemoveHyphen} from '@/lib/utils';

type Props = {
    category: string;
    count: string;
}

const CategoryCard = ({category, count}: Props) => {
    return (
        <Link href={`/categories/${category}`}>
            <div className="group p-4 overflow-hidden relative shadow-md hover:shadow-lg transition-all ease-in-out bg-stone-800 border-4 border-transparent hover:border-emerald-500 hover:border-4 hover:border-solid rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                    <h2 className="font-semibold text-md text-stone-300">{capitalizeAndRemoveHyphen(category)} <span className="text-stone-600 text-md">Tools</span></h2>
                    <div className="bg-black text-[9px] text-gray-400 rounded-full p-1.5 min-w-[26px] flex justify-center">{count}</div>
                </div>
            </div>
        </Link>
    )
}

export default CategoryCard
