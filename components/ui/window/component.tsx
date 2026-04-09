"use client";

import { ComponentProps, useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import { Point } from "@/lib/point";
import VibrantSurface from "@/ui/vibrant-surface";
import TrafficLight from "./traffic-light";
import styles from "./component.module.scss";

const inter = Inter({ subsets: ["latin"] });

type WindowComponentProps = ComponentProps<"div"> & {
    handle: string;
    borderRadius?: number;
    canMinimize?: boolean;
    canMaximize?: boolean;
    children: React.ReactNode;
}

export default function WindowComponent({
    handle,
    borderRadius = 16,
    canMinimize = true,
    canMaximize = true,
    children,
    ...props
}: WindowComponentProps) {
    const [init, setInit] = useState<Point>({ x: 0, y: 0 });
    const [origin, setOrigin] = useState<Point>({ x: 0, y: 0 });
    const [moving, setMoving] = useState(false);

    const handleMessages = (e: MessageEvent) => {
        switch (e.data.type) {
            case "origin":
                if (e.data.handle !== handle) return;
                setOrigin(e.data.origin);
                break;
        }
    };
    
    const startMoving = (e: React.PointerEvent<HTMLDivElement>) => {
        setMoving(true);
        setInit({ x: e.clientX, y: e.clientY });
    };

    const moveWindow = (e: PointerEvent) => {
        if (!moving) return;

        const newOrigin = {
            x: origin.x + (e.clientX - init.x),
            y: origin.y + (e.clientY - init.y)
        };

        setOrigin(newOrigin);
        
        window.parent.postMessage({
            type: "move",
            handle,
            origin: newOrigin,
        }, "*");
    };

    const stopMoving = (e: PointerEvent) => {
        setMoving(false);
    };

    useEffect(() => {
        document.addEventListener("pointermove", moveWindow);
        document.addEventListener("pointerup", stopMoving);

        return () => {
            document.removeEventListener("pointermove", moveWindow);
            document.removeEventListener("pointerup", stopMoving);
        };
    }, [moveWindow, stopMoving]);

    useEffect(() => {
        window.addEventListener("message", handleMessages);
        return () => window.removeEventListener("message", handleMessages);
    }, []);

    useEffect(() => {
        if (!handle) return;
        window.parent.postMessage({ type: "init", handle }, "*");
    }, [handle]);

    return (
        <VibrantSurface
            onPointerDown={startMoving}
            className={`${styles.base} ${inter.className}`}
            radius={borderRadius}
            tabIndex={0}
            {...props}
        >
            <div className={styles.content}>
                <div className={styles.titleBar}>
                    <TrafficLight
                        canMinimize={canMinimize}
                        canMaximize={canMaximize}
                    />
                </div>
                <div className={styles.body}>
                    {children}
                </div>
            </div>
        </VibrantSurface>
    );
}
