import { cn } from '@/lib/utils';
import { StaticImageData } from 'next/image';
import React from 'react';

interface BackgroundImageProps {
    src: StaticImageData | string;
    children?: React.ReactNode;
    className?: string;
}

export default function BackgroundImage({ src, children, className, ...rest }: BackgroundImageProps) {
    return (
        <div
            style={{
                backgroundImage: `url(${typeof src === 'string' ? src : src.src})`, // Handle both StaticImageData and string
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            {...rest}
            className={cn('relative flex items-center justify-center w-full h-full', className)}
        >
            {children}
        </div>
    );
}