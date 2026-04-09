"use client";

import MenuBar from "@/ui/menu-bar/menu-bar";
import styles from "./desktop.module.scss";
import Dock from "@/ui/dock";
import { useState } from "react";
import AboutMe from "./about-me";
import Contacts from "./contacts";

type DesktopProps = {
    children: React.ReactNode;
}

export default function Desktop({
    children
}: DesktopProps) {
    const [aboutMeShown, setAboutMeShown] = useState(false);

    const handleMenu = (selected: string) => {
        switch (selected) {
            case "about_me":
                setAboutMeShown(true);
                break;
            case "immersive_mode":
                document.documentElement.requestFullscreen();
                break;
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
                <Contacts />
            </div>
            {/* <Dock /> */}
        </div>
    );
}
