import React from 'react'
import Sidebar from '../Sidebar';

type Props = {
    children: React.ReactNode
}

const MainSideNav = async ({children}: Props) => {

    return (
        <div className="block md:flex min-h-screen max-h-screen overflow-y-auto">
            <Sidebar />
            {children}
        </div>
    )
}

export default MainSideNav
