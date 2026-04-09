import { ComponentProps, useEffect, useRef, useState } from "react";
import { Point } from "@/lib/point";
import styles from "./frame.module.scss";

type WindowFrameProps = ComponentProps<"div"> & {
    src: string;
    handle: string;
    width: number;
    height: number;
    position: Point;
    alwaysOnTop?: boolean;
};

export default function WindowFrame({
    src,
    handle,
    width,
    height,
    position,
    alwaysOnTop = false,
    ...props
}: WindowFrameProps) {
    const frameRef = useRef<HTMLIFrameElement>(null);
    const [loaded, setLoaded] = useState(false);
    const [origin, setOrigin] = useState<Point>(position);

    const handleMessages = (e: MessageEvent) => {
        switch (e.data.type) {
            case "init":
                return initialize();
            case "move":
                return moveWindow(e.data);
        }
    };

    const initialize = () => {
        frameRef.current?.contentWindow?.postMessage({
            type: "origin",
            handle,
            origin
        }, "*");
    };

    const moveWindow = (data: any) => {
        if (data.handle !== handle) return;
        setOrigin(data.origin);
    };

    useEffect(() => {
        if (!loaded) return;

        frameRef.current?.focus();

        window.addEventListener("message", handleMessages);
        return () => window.removeEventListener("message", handleMessages);
    }, [loaded]);

    const style = {
        width,
        height,
        top: origin.y,
        left: origin.x,
        zIndex: alwaysOnTop && 9000,
        display: loaded ? "block" : "none",
    };

    return (
        <div
            style={style}
            className={styles.base}
            tabIndex={1}
            autoFocus
            {...props}
        >
            <iframe
                src={`${src}#handle=${handle}`}
                width={width-2}
                height={height-2}
                ref={frameRef}
                className={styles.frame}
                onLoad={() => setLoaded(true)}
            ></iframe>
        </div>
    );
}

