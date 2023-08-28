"use client";

import supabase from '@/lib/supabase';
import {useSearchParams} from 'next/navigation';
import React from 'react'
import {ScrollArea} from './ui/scroll-area';
import Footer from './Footer';
import ToolsGridArea from './ToolsGridArea';
import {Separator} from './ui/separator';
import Loader from './Loader';

type Props = {}

const SearchResultsContentArea = (props: Props) => {
    const [searchResults, setSearchResults] = React.useState<any>({data: [], error: null, fetching: true});

    // get query param from url
    const searchParams = useSearchParams();
    const searchString = searchParams.get('query');

    React.useEffect(() => {
        const getSearchResults = async () => {
            if (!searchString) {
                setSearchResults({data: [], error: null, fetching: false});
                return;
            }
            const {data, error} = await supabase
                .from('tools')
                .select()
                .textSearch('title_description', searchString!)

            if (data || error) {
                setSearchResults({data: data, error: error, fetching: false});
            } else {
                setSearchResults({data: [], error: error, fetching: false});
            }
        }
        getSearchResults();
    }, [searchString])


    return (
        <ScrollArea className="p-8">
            <h1 className="mt-6 text-3xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 sm:text-2xl lg:text-2xl">Search results for: {searchString}</h1>
            <Separator className="my-8 bg-stone-700 bg-opacity-75" />
            {searchResults.fetching && <Loader />}
            {!searchResults.fetching && searchResults.data && <ToolsGridArea offset={2} pageCount={searchResults.data.length} tools={searchResults.data} />}
            <Footer />
        </ScrollArea>
    )
}

export default SearchResultsContentArea
