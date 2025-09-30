"use client";

import styles from "./page.module.scss";
import { useEffect, useRef, useState } from "react";
import colorsData from "./colors_full.json";

export default function WPlaceInspectorPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const [colors] = useState(colorsData);
    const [active, setActive] = useState<number | null>(null);
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    const getImageData = (image: HTMLImageElement) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const { width, height } = image;

        canvas.width = width;
        canvas.height = height;

        context?.drawImage(image, 0, 0);

        return context?.getImageData(0, 0, width, height);
    };

    const numberToHex = (n: number) => {
        return n.toString(16).padStart(2, "0");
    };

    function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file) return;

        const img = new window.Image();
        img.onload = () => setImage(img);
        img.src = URL.createObjectURL(file);
    }

    function handleColorClick(i: number) {
        setActive(active === i ? null : i);
    }

    useEffect(() => {
        if (!image) return;
        
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const { width, height } = image;

        const imageData = getImageData(image);
        if (!imageData) return;

        // Calculate pixel size so all pixels are square and fit as much as possible
        const pixelSize = Math.min(
            Math.floor(canvas.width / width),
            Math.floor(canvas.height / height)
        );

        // Calculate clipped region
        const maxX = Math.floor(canvas.width / pixelSize);
        const maxY = Math.floor(canvas.height / pixelSize);

        for (let y = 0; y < height && y < maxY; y++) {
            for (let x = 0; x < width && x < maxX; x++) {
                const i = (y * width + x) * 4;
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];
                const hex = `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}`;

                const a = (!active || hex === colors[active].color) ? 1 : 0.2;

                context.fillStyle = `rgba(${r},${g},${b},${a})`;
                context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            }
        }
    }, [image, active]);

    return (
        <main className={styles.main}>
            <h1>WPlace Inspector</h1>
            <input type="file" accept="image/*" onChange={handleUpload} />
            <canvas ref={canvasRef} className={styles.canvas} />
            {/* Color grid rendered as a separate section below canvas/image logic */}
            <section style={{ marginTop: 32 }}>
                <h2 style={{ fontSize: 18, marginBottom: 12 }}>Color Grid</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))", gap: 8 }}>
                    {colors.map((c, i) => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: !active || active === i ? 1 : 0.5 }} onClick={() => handleColorClick(i)}>
                            <div style={{ width: 40, height: 40, background: c.color, border: "1px solid #ccc", borderRadius: 6 }} />
                            <div style={{ fontSize: 12, marginTop: 4, textAlign: "center" }}>{c.name}</div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
