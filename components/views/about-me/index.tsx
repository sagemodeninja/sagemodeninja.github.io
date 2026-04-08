import DesktopWindow from "@/ui/window";
import Image from "next/image";
import styles from "./index.module.scss";

export default function AboutMe() {
    const yearNow = new Date().getFullYear();

    return (
        <DesktopWindow
            top={200}
            left={200}
            width={300}
            height={450}
        >
            <div className={styles.content}>
                <Image
                    src="/images/avatar@150.png"
                    alt="Gary Antier"
                    width={221}
                    height={150}
                />

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
