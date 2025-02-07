"use client"

import { useRef, useEffect } from 'react'

export default function VideoPlayer({ src }) {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => console.error('Error playing video:', error))
        }
    }, [])

    return (
        <video ref={videoRef} className="w-full" height="100%" autoPlay muted loop playsInline>
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    )
}