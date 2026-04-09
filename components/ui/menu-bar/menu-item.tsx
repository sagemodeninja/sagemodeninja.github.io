"use client";

import { forwardRef } from "react";
import styles from "./menu-item.module.scss";

type MenuItemProps = {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}

const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(({
    children,
    active = false,
    onClick
}, ref) => (
    <button
        ref={ref}
        className={`${styles.menuItem} ${active ? styles.active : ""}`}
        onClick={onClick}
    >
        {children}
    </button>
));

export default MenuItem;
