"use client";

import { useEffect, useState } from "react";
import { flip, offset, shift, useFloating } from "@floating-ui/react";
import ContextMenu, { ContextMenuItem } from "@/ui/context-menu";
import DateTimeMenuWidget from "./date-time";
import MenuItem from "./menu-item";
import styles from "./menu-bar.module.scss";

type MenuBarProps = {
    onSelect?: (value: string) => void;   
}

export default function MenuBar({ onSelect }: MenuBarProps) {
    const [menuShown, setMenuShown] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string>(null);
    const [items, setItems] = useState<ContextMenuItem[]>([]);

    const { floatingStyles, refs } = useFloating({
        middleware: [offset(4), flip(), shift({ padding: 8 })],
    });

    function showMenu(key: string) {
        setMenuShown(true);
        setActiveMenu(key);
        setItems([{
            icon: (
                <svg width={14} height={14} viewBox="0 0 16.7969 17.5684" fill="currentColor">
                    <path d="M1.66992 17.5586L14.7656 17.5586C15.8105 17.5586 16.4355 17.0703 16.4355 16.2598C16.4355 13.7402 13.2812 10.2637 8.21289 10.2637C3.1543 10.2637 0 13.7402 0 16.2598C0 17.0703 0.625 17.5586 1.66992 17.5586ZM8.22266 8.51562C10.3125 8.51562 12.1289 6.64062 12.1289 4.19922C12.1289 1.78711 10.3125 0 8.22266 0C6.13281 0 4.31641 1.82617 4.31641 4.21875C4.31641 6.64062 6.12305 8.51562 8.22266 8.51562Z" />
                </svg> 
            ),
            label: "About Me",
            value: "about_me"
        }]);
    }

    function handleDismiss(event: MouseEvent) {
        setActiveMenu(null);

        const floating = refs.floating.current;
        setMenuShown(floating && floating.contains(event.target as Node));
    }

    function handleSelect(value: string) {
        setMenuShown(false);
        onSelect?.(value);
    }

    useEffect(() => {
        document.addEventListener("pointerdown", handleDismiss);
        return () => document.removeEventListener("pointerdown", handleDismiss);
    }, []);

    return (
        <div className={styles.menuBar}>
            <div className={styles.menuItems}>
                <MenuItem
                    ref={refs.setReference}
                    onClick={() => showMenu("about_me")}
                    active={activeMenu === "about_me"}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21.146,8.182c-0.139,0.108 -2.597,1.493 -2.597,4.572c0,3.562 3.128,4.822 3.221,4.853c-0.014,0.077 -0.497,1.726 -1.649,3.406c-1.027,1.479 -2.1,2.955 -3.732,2.955c-1.632,0 -2.052,-0.948 -3.936,-0.948c-1.836,0 -2.489,0.979 -3.982,0.979c-1.493,0 -2.535,-1.368 -3.732,-3.048c-1.387,-1.973 -2.508,-5.038 -2.508,-7.947c0,-4.666 3.034,-7.141 6.02,-7.141c1.587,0 2.909,1.042 3.905,1.042c0.948,0 2.427,-1.104 4.232,-1.104c0.684,0 3.142,0.062 4.76,2.381Zm-5.617,-4.356c0.746,-0.886 1.275,-2.115 1.275,-3.344c0,-0.17 -0.014,-0.343 -0.046,-0.482c-1.215,0.046 -2.659,0.809 -3.531,1.819c-0.684,0.778 -1.323,2.007 -1.323,3.252c0,0.187 0.031,0.374 0.046,0.434c0.077,0.014 0.202,0.031 0.326,0.031c1.09,0 2.46,-0.73 3.252,-1.711Z" />
                    </svg>
                </MenuItem>
            </div>
            <div className={styles.quickActions}>
                <DateTimeMenuWidget />
            </div>
            {menuShown && (
                <ContextMenu
                    ref={refs.setFloating}
                    items={items}
                    onSelect={handleSelect}
                    style={floatingStyles}
                />
            )}
        </div>
    );
}
