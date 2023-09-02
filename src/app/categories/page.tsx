import React from 'react'
import {CATEGORIES_CONTENT} from '@/constants/Content'
import supabase from '@/lib/supabase'
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import CategoriesContentArea from '@/components/CategoriesContentArea'

type Props = {}

export const revalidate = 30;

export const metadata = {
    title: 'AI Tool Categories | AI Tools',
    description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
    openGraph: {
        title: 'AI Tool Categories | AI Tools',
        url: 'https://aitools.sh',
        description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
        type: 'website',
        images: {
            url: '/opengraph-image.jpg',
            alt: 'Free AI Tools Library | AiTools',
          },
    },
    twitter: {
        title: 'AI Tool Categories | AI Tools',
        creator: '@cosmiclasagnadev',
        card: 'summary_large_image',
        site: 'https://aitools.sh',
        description: 'Curated collection of AI tools, all in one place. Discover the perfect tool for your next project or business and speed up your workflow!',
        type: 'website',
    }
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
