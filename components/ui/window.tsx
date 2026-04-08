"use client";

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import TrafficLight from "./traffic-light";
import styles from "./window.module.scss";

type DesktopWindowProps = {
    top: number;
    left: number;
    width?: number;
    height?: number;
    children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export default function DesktopWindow({
    top,
    left,
    width = 100,
    height = 100,
    children
}: DesktopWindowProps) {
    const [isMoving, setIsMoving] = useState(false);

    const [initX, setInitX] = useState(left);
    const [initY, setInitY] = useState(top);

    const [originX, setOriginX] = useState(0);
    const [originY, setOriginY] = useState(0);

    const [windowX, setWindowLeft] = useState(left);
    const [windowY, setWindowTop] = useState(top);
    
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
        const y = originY + (e.clientY - initY);

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

    const style = {
        top: windowY,
        left: windowX,
        width: width,
        height: height,
    };

    return (
        <div
            className={`${styles.base} ${inter.className}`}
            style={style}
            onPointerDown={handlePointerDown}
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
        </div>
    );
}
