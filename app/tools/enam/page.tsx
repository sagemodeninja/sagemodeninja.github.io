"use client";

import "./page.scss";

import { useEffect, useState } from "react";

export default function Page() {
    const [result, setResult] = useState(6);

    const rand = () => {
        const r = Math.floor(Math.random() * 6) + 1;
        setResult(r);
    }

    const roll = (n: number = 5) => {
        if (n === 0) return;

        rand();

        setTimeout(() => roll(n - 1), 200);
    }

    useEffect(() => {
        rand();
    }, []);
    
    return (
        <div className="container" onClick={() => roll()}>
            <div id="dice" className={`face_${result}`}>
                {Array.from({ length: result }, (_, i) => (
                    <div key={i} className="dot"></div>
                ))}
            </div>
        </div>
    );
}
