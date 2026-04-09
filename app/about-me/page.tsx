"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import WindowComponent from "@/ui/window/component";
import forwardHandle from "@/lib/window";

const yearNow = new Date().getFullYear();

const AboutPage = forwardHandle((_, handle) => (
    <WindowComponent
        handle={handle}
        canMinimize={false}
        canMaximize={false}
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
    </WindowComponent>
));

export default AboutPage;
