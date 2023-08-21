"use client";

import React from 'react'
import {ScrollArea} from './ui/scroll-area';
import SimpleHeroBanner from './SimpleHeroBanner';
import {Separator} from './ui/separator';
import ToolsGridArea from './ToolsGridArea';
import Footer from './Footer';

type Props = {
    content: {heroTitle: string, heroDescription: string},
    tools: any;
}

const ToolsContentArea = ({content, tools}: Props) => {
    return (
        <ScrollArea className="p-8">
            <SimpleHeroBanner {...content} />
            <Separator className="my-8 bg-stone-700 bg-opacity-75" />
            <ToolsGridArea tools={tools} />
            <Footer />
        </ScrollArea>
    )
}

export default ToolsContentArea
