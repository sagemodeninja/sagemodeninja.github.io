"use client";

import { ComponentPropsWithoutRef, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import TrafficLight from "./traffic-light";
import styles from "./window.module.scss";
import VibrantSurface from "../vibrant-surface";

type DesktopWindowProps = ComponentPropsWithoutRef<"div"> & {
    bounds: DOMRect;
    children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function DesktopWindow({children, bounds, ...props}: DesktopWindowProps) {
    const [style, setStyle] = useState<React.CSSProperties>();
    const [isMoving, setIsMoving] = useState(false);

    const [initX, setInitX] = useState(0);
    const [initY, setInitY] = useState(0);

    const [originX, setOriginX] = useState(0);
    const [originY, setOriginY] = useState(0);

    const [windowX, setWindowLeft] = useState(0);
    const [windowY, setWindowTop] = useState(0);
    
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        setIsMoving(true);

        setInitX(e.clientX);
        setInitY(e.clientY);

        setOriginX(windowX);
        setOriginY(windowY);
    };

    const handlePointerMove = (e: PointerEvent) => {
        if (!isMoving) return;

        const x = originX + (e.clientX - initX);
        const y = Math.max(32, originY + (e.clientY - initY));

        setWindowTop(y);
        setWindowLeft(x);
    };

    const handlePointerUp = (e: PointerEvent) => {
        setIsMoving(false);
    };

    useEffect(() => {
        document.addEventListener("pointermove", handlePointerMove);
        document.addEventListener("pointerup", handlePointerUp);

        return () => {
            document.removeEventListener("pointermove", handlePointerMove);
            document.removeEventListener("pointerup", handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]);

    useEffect(() => {
        if (!bounds) return;
        setWindowLeft(bounds.x);
        setWindowTop(bounds.y);
    }, [bounds]);

    useEffect(() => {
        if (!bounds) return;
        setStyle({
            top: windowY,
            left: windowX,
            width: bounds.width,
            height: bounds.height,
        });
    }, [windowX, windowY, bounds]);

    return (
        <VibrantSurface
            className={`${styles.base} ${inter.className}`}
            style={style}
            onPointerDown={handlePointerDown}
            autoFocus={true}
            tabIndex={0}
            {...props}
        >
            <div className={styles.content}>
                <div className={styles.titleBar}>
                    <TrafficLight
                        canMinimize={false}
                        canMaximize={false}
                    />
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </VibrantSurface>
    );
}
