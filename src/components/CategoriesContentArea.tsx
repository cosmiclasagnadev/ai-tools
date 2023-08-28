"use client";

import React from 'react'
import {ScrollArea} from './ui/scroll-area'
import SimpleHeroBanner from './SimpleHeroBanner'
import {Separator} from './ui/separator'
import CategoryCard from './CategoryCard'
import Footer from './Footer'
import {motion} from 'framer-motion';

type Props = {
    content: {heroTitle: string, heroDescription: string},
    categories: any;
}

const CategoriesContentArea = ({content, categories}: Props) => {
    const PAGE_COUNT = categories.length;

    return (
        <ScrollArea className="p-8">
            <SimpleHeroBanner {...content} />
            <Separator className="my-8 bg-stone-700 bg-opacity-75" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories?.map((category: any, i: number) => {
                    const recalculatedDelay = i >= PAGE_COUNT * 2 ? (i - PAGE_COUNT) / 15 : i / 15
                    return (
                        <motion.div
                            key={category.id}
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{
                                duration: 0.4,
                                ease: [0.25, 0.25, 0, 1],
                                delay: recalculatedDelay,
                            }}
                        >
                            <CategoryCard key={category.category} category={category.category} count={category.count} />
                        </motion.div>
                    )
                })}
            </div>
            <Footer />
        </ScrollArea>
    )
}

export default CategoriesContentArea
