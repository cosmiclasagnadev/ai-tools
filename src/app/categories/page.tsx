import SimpleHeroBanner from '@/components/SimpleHeroBanner'
import React from 'react'
import {CATEGORIES_CONTENT} from '@/constants/Content'
import {Separator} from '@/components/ui/separator'
import supabase from '@/lib/supabase'
import CategoryCard from '@/components/CategoryCard'
import {capitalizeAndRemoveHyphen} from '@/lib/utils'

type Props = {}

const CategoriesPage = async (props: Props) => {
    const {data: categories} = await supabase.from('tools_categ').select('*');
    return (
        <main className="min-h-screen w-full p-8 bg-stone-900">
            <SimpleHeroBanner {...CATEGORIES_CONTENT} />
            <Separator className="my-8 bg-stone-700 bg-opacity-75" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categories?.map((category) => (
                    <CategoryCard key={category.category} category={category.category} count={category.count} />
                ))}
            </div>
        </main>
    )
}

export default CategoriesPage
