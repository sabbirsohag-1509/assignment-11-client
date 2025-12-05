import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../pages/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div  className='max-w-7xl mx-auto px-3'>
            <Navbar></Navbar>
            <section> 
                <Outlet></Outlet>
            </section>
        </div>
    );
};

export default RootLayout;