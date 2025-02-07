'use client'

import NavigationIcon from '@mui/icons-material/Navigation';
import React, { useState , useEffect } from 'react';


export default function Top() {
    const [isVisible, setIsVisible] = useState(false);

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // Function to handle scroll event
    const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Add scroll event listener when component mounts
    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div style={{ position: 'fixed', bottom: '100px', right: '20px', display: isVisible ? 'block' : 'none' }}>
                <button className='drop-shadow-2xl' onClick={scrollToTop} style={{ padding: '16px', color: '#fff', border: 'none', borderRadius: '90%', cursor: 'pointer',backgroundColor : '#ff3333' }}>
                    <NavigationIcon />
                </button>
            </div>
        </>
    )
}