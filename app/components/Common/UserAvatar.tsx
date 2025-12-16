'use client';

import React, { useState, useEffect } from 'react';

interface UserAvatarProps {
    src?: string;
    alt?: string;
    className?: string;
}

const DefaultAvatarSVG = (className: string) => (
    <div className={`flex items-center justify-center bg-gray-200 text-gray-400 ${className}`}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-2/3 h-2/3"
        >
            <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
            />
        </svg>
    </div>
);


const UserAvatar: React.FC<UserAvatarProps> = ({ src, alt = 'User Avatar', className = '' }) => {
    const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

    useEffect(() => {
        if (!src) {
            setStatus('error');
            return;
        }

        setStatus('loading');

        const image = new Image();
        image.src = src;

        image.onload = () => {
            setStatus('loaded');
        };

        image.onerror = () => {
            setStatus('error');
        };
        return () => {
            image.onload = null;
            image.onerror = null;
        };

    }, [src]);

    if (!src || status === 'error' || status === 'loading') {
        return DefaultAvatarSVG(className);
    }

    if (status === 'loaded') {
        return (
            <img
                src={src}
                alt={alt}
                className={`${className} object-cover`}
                loading="eager"
            />
        );
    }

    return DefaultAvatarSVG(className);
};

export default UserAvatar;