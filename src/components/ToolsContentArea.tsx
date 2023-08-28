"use client";

import React from 'react'
import {ScrollArea} from './ui/scroll-area';
import SimpleHeroBanner from './SimpleHeroBanner';
import {Separator} from './ui/separator';
import ToolsGridArea from './ToolsGridArea';
import Footer from './Footer';
import {Button} from './ui/button';
import supabase from '@/lib/supabase';

type Props = {
    content: {heroTitle: string, heroDescription: string},
    queryFunction: (from: number, to: number) => Promise<any>,
    tools: any;
}

const ToolsContentArea = ({content, queryFunction, tools}: Props) => {
    const PAGE_COUNT = 20;
    const [loadedTools, setLoadedTools] = React.useState<any>(tools);
    const [offset, setOffset] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isLast, setIsLast] = React.useState(tools.length < PAGE_COUNT ? true : false);

    const fetchMoreTools = async (offset: number) => {
        const from = offset * PAGE_COUNT;
        const to = from + PAGE_COUNT - 1;
        const {data: newTools} = await queryFunction(from, to);
        return newTools as any[];
    }

    const loadMoreTools = async () => {
        setIsLoading(true)
        setOffset((prev) => prev + 1)
        const newTools: any[] = await fetchMoreTools(offset);
        setLoadedTools((prev: any) => [...prev, ...newTools as any[]])
        if (newTools.length < PAGE_COUNT) {
            setIsLast(true)
        }
        setIsLoading(false)
    }

    return (
        <ScrollArea className="p-8">
            <SimpleHeroBanner {...content} />
            <Separator className="my-8 bg-stone-700 bg-opacity-75" />
            <ToolsGridArea tools={loadedTools} pageCount={PAGE_COUNT} offset={offset} />
            {!isLast && (
                <div className="w-full p-4 my-4">
                    <center>
                        <Button variant="default" onClick={loadMoreTools} disabled={isLoading}>
                            {isLoading ? "⏳ Loading..." : "Load More"}
                        </Button>
                    </center>
                </div>
            )}
            <Footer />
        </ScrollArea>
    )
}

export default ToolsContentArea
