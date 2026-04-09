"use client";

import Image from "next/image";
import DesktopWindow from "@/ui/window/window";
import styles from "./about-me.module.scss";
import { useEffect, useState } from "react";

type AboutMeProps = {
    shown: boolean;
    onClose: () => void;
}

export default function AboutMe({
    shown,
    onClose
}: AboutMeProps) {
    const yearNow = new Date().getFullYear();
    const [rect, setRect] = useState<DOMRect>();

    useEffect(() => {
        setRect(new DOMRect(200, 200, 300, 450));
    }, []);

    return (shown &&
        <DesktopWindow
            bounds={rect}
            onBlur={onClose}
        >
            <div className={styles.content}>
                <div className={styles.avatar}>
                    <Image
                        src="/images/me.webp"
                        alt="Gary Antier"
                        width={157}
                        height={150}
                    />
                </div>

                <div className={styles.header}>
                    <p className={styles.name}>Gary Antier</p>
                    <p className={styles.year}>1998</p>
                </div>

                <div className={styles.body}>
                    <div className={styles.details}>
                        <p className={styles.label}>Work</p>
                        <p className={styles.value}>Software Engineer</p>
                    </div>
                    <div className={styles.details}>
                        <p className={styles.label}>Employer</p>
                        <p className={styles.value}>RAFI MFI</p>
                    </div>
                    <div className={styles.details}>
                        <p className={styles.label}>Degree</p>
                        <p className={styles.value}>BS-ICT</p>
                    </div>
                </div>

                <div className={styles.footer}>
                    <p>© 1998-{yearNow} Antier Family.</p>
                    <p>All Rights Reserved.</p>
                </div>
            </div>
        </DesktopWindow>
    );
}
