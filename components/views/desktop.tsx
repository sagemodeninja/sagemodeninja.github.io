"use client";

import MenuBar from "@/ui/menu-bar/menu-bar";
import styles from "./desktop.module.scss";
import Dock from "@/ui/dock";
import { useState } from "react";
import AboutMe from "./about-me";

type DesktopProps = {
    children: React.ReactNode;
}

export default function Desktop({
    children
}: DesktopProps) {
    const [aboutMeShown, setAboutMeShown] = useState(true);

    const handleMenu = (selected: string) => {
        if (selected === "about_me") {
            setAboutMeShown(true);
        }
    }

    return (
        <div className={styles.desktop}>
            <MenuBar onSelect={handleMenu} />
            <div className={styles.safeArea}>
                {children}
                <AboutMe
                    shown={aboutMeShown}
                    onClose={() => setAboutMeShown(false)}
                />
            </div>
            {/* <Dock /> */}
        </div>
    );
}
