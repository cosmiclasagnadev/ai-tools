import React from 'react'
import Header from '../Header';

type Props = {
    children: React.ReactNode;
}

const ContentAreaLayout = ({children}: Props) => {
    return (
        <main className="min-h-screen max-h-screen overflow-y-auto w-full bg-stone-900 relative">
            <Header />
            {children}
        </main>
    )
}

export default ContentAreaLayout
