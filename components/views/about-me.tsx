"use client";

import { useEffect, useState } from "react";
import WindowFrame from "@/ui/window/frame";

type AboutMeProps = {
    shown: boolean;
    onClose: () => void;
}

export default function AboutMe({
    shown,
    onClose
}: AboutMeProps) {
    const [handle, setHandle] = useState<string>(null);

    useEffect(() => {
        setHandle(crypto.randomUUID());
    }, []);
    
    return shown && handle && (
        <WindowFrame
            src="about-me"
            handle={handle}
            width={300}
            height={450}
            position={{ x: 200, y: 200 }}
            alwaysOnTop={true}
            onBlur={onClose}
        >
        </WindowFrame>
    );
}
