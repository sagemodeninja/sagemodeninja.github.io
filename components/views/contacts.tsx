"use client";

import { useEffect, useState } from "react";
import WindowFrame from "@/ui/window/frame";
import styles from "./contacts.module.scss";

export default function Contacts() {
    const [handle, setHandle] = useState<string>(null);

    useEffect(() => {
        setHandle(crypto.randomUUID());
    }, []);
    
    return handle && (
        <WindowFrame
            src="/contacts"
            handle={handle}
            width={800}
            height={500}
            position={{ x: 100, y: 100 }}
        ></WindowFrame>
    );
}
