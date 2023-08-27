import Link from 'next/link';
import React from 'react'
import Image from 'next/image';

type ToolCardProps = {
    title: string;
    description: string;
    featured_image: string;
    tags: string[];
    url: string;
    freeOrPaid: 'free-plan' | "free" | "subscription" | "paid"
}

const ToolCard = ({title, description, featured_image, tags, url, freeOrPaid}: ToolCardProps) => {
    return (
        <Link href={url} target="_blank" className="h-fit">
            <div className="mb-2 group overflow-hidden relative shadow-md shadow-stone-800/50 hover:shadow-stone-800/75 hover:shadow-lg transition-all ease-in-out bg-stone-900 border border-stone-500/25 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="transparent-dark p-3 overflow-hidden rounded-lg bg-gray-200 border-4 border-transparent hover:border-emerald-500 hover:border-4 hover:border-solid cursor-pointer w-full min-h-[100px] flex items-center justify-center">
                    <Image className="object-cover group-hover:scale-[1.05] transition-transform duration-500 v-lazy-image v-lazy-image-loaded" alt={`image depicting ${title}`} src={featured_image} width={400} height={200} />
                </div>
                <div className="absolute bottom-2 right-2 group-hover:flex hidden items-end space-x-2 flex-col ">
                    <div className="flex flex-row justify-end w-full pr-1 space-x-2">
                        <div className="text-gray-700 text-xs bg-white px-2 py-1 rounded-md flex items-center border border-gray-200">
                            {freeOrPaid}
                        </div>
                        <div className="bg-gradient-to-r from-emerald-600 to-green-700 px-2 py-1 rounded-md"><h2 className="text-md font-bold tracking-tight text-stone-100 dark:text-white">{title}</h2></div>
                    </div>
                    {tags && (
                        <div className="space-x-1.5 flex justify-end overflow-x-auto flex-wrap">
                            {tags?.map((tag) => (
                                <span key={tag} className="p-1 bg-stone-800 rounded-sm text-xs text-stone-200 mt-2">{tag}</span>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </Link>

    )
}

export default ToolCard
