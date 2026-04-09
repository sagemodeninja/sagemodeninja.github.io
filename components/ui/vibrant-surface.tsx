"use client";

import { ComponentProps, use, useEffect } from 'react';
import styles from './vibrant-surface.module.scss';

type VibrantSurfaceProps = ComponentProps<"div"> & {
    radius?: number;
    children: React.ReactNode;
}

export default function VibrantSurface({
    style,
    className,
    radius = 16,
    children,
    ...props
}: VibrantSurfaceProps) {
    return (
        <div
            style={{ ...style, borderRadius: radius }}
            className={`${className} ${styles.surface}`}
            {...props}
        >
            <div
                style={{ borderRadius: radius - 1 }}
                className={styles.content}
            >
                {children}
            </div>
        </div>
    );
}
