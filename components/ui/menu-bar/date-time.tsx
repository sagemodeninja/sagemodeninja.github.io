"use client";

import { useEffect, useState } from "react";
import styles from "./date-time.module.scss";
import { format } from "date-fns";
import MenuItem from "./menu-item";

export default function DateTimeMenuWidget() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <MenuItem>
            <span className={styles.widget}>
                {format(time, "EEE MMM d hh:mm aa")}
            </span>
        </MenuItem>
    );
}
