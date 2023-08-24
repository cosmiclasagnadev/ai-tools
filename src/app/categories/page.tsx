import React from 'react'
import {CATEGORIES_CONTENT} from '@/constants/Content'
import supabase from '@/lib/supabase'
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import CategoriesContentArea from '@/components/CategoriesContentArea'

type Props = {}

export const revalidate = 30;

export const metadata = {
    title: 'AI Tool Categories | AI Tools',
}

const CategoriesPage = async (props: Props) => {
    const {data: categories} = await supabase.from('tools_categ').select('*');
    return (
        <ContentAreaLayout>
            <CategoriesContentArea content={CATEGORIES_CONTENT} categories={categories} />
        </ContentAreaLayout>
    )
}

export default CategoriesPage
