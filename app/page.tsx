"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import Desktop from "@/views/desktop";
import styles from "./page.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
    return (
        <Desktop>
            <span></span>
        </Desktop>
    );
}
