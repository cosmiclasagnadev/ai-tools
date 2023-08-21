"use client";

import React from 'react'
import {ScrollArea} from './ui/scroll-area'
import SimpleHeroBanner from './SimpleHeroBanner'
import {Separator} from './ui/separator'
import CategoryCard from './CategoryCard'
import Footer from './Footer'

type Props = {
    content: {heroTitle: string, heroDescription: string},
    categories: any;
}

const CategoriesContentArea = ({content, categories}: Props) => {
    return (
        <ScrollArea className="p-8">
            <SimpleHeroBanner {...content} />
            <Separator className="my-8 bg-stone-700 bg-opacity-75" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories?.map((category: any) => (
                    <CategoryCard key={category.category} category={category.category} count={category.count} />
                ))}
            </div>
            <Footer />
        </ScrollArea>
    )
}

export default CategoriesContentArea
