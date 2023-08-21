import React from 'react'
import Sidebar from '../Sidebar';

type Props = {
    children: React.ReactNode
}

const MainSideNav = async ({children}: Props) => {

    return (
        <div className="block md:flex">
            <Sidebar />
            {children}
        </div>
    )
}

export default MainSideNav
