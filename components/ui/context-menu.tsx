import { forwardRef } from "react";
import VibrantSurface from "./vibrant-surface";
import styles from "./context-menu.module.scss";

export type ContextMenuItem = {
    icon?: React.ReactNode;
    label: string;
    value: string;
}

type ContextMenuProps = {
    style: React.CSSProperties;
    items: ContextMenuItem[];
    onSelect?: (value: string) => void;
}

const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(({
    style,
    items,
    onSelect
}, ref) => (
    <VibrantSurface
        ref={ref}
        radius={12}
        style={style}
        className={styles.menu}
    >
        {items.map((item, index) => (
            <button
                key={index}
                className={styles.item}
                onClick={() => onSelect?.(item.value)}
            >
                {item.icon && <div className={styles.icon}>{item.icon}</div>}
                <span className={styles.label}>{item.label}</span>
            </button>
        ))}
    </VibrantSurface>
));

export default ContextMenu;