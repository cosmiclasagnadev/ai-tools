import SearchResultsContentArea from '@/components/SearchResultsContentArea';
import ContentAreaLayout from '@/components/layouts/ContentAreaLayout'
import supabase from '@/lib/supabase';
import {useSearchParams} from 'next/navigation'
import React from 'react'

type Props = {}

const SearchResultsPage = (props: Props) => {

    return (
        <ContentAreaLayout>
            <SearchResultsContentArea />
        </ContentAreaLayout>
    )
}

export default SearchResultsPage
