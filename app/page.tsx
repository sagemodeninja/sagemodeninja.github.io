import styles from "./page.module.scss";
import Image from "next/image";

export default function Page() {
    return (
        <main className={styles.main}>
            <div className={styles["contact-container"]}>
                <div className={styles.section}>
                    <h1 className={styles.title}>
                        <svg className={styles.icon} height="16px" viewBox="0 0 24 24" style={{"fillRule":"evenodd","clipRule":"evenodd","strokeLinecap":"round","strokeLinejoin":"round"}}>
                            <g>
                                <path d="M3.111,6.111L12,12.667L20.889,6.111" />
                                <path d="M22,6.222L22,17.778C22,18.882 21.104,19.778 20,19.778L4,19.778C2.896,19.778 2,18.882 2,17.778L2,6.222C2,5.118 2.896,4.222 4,4.222L20,4.222C21.104,4.222 22,5.118 22,6.222Z" />
                            </g>
                        </svg>
                        <span className={styles.label}>Email</span>
                    </h1>
                    <a href="mailto:contact@garyantier.com">contact@garyantier.com</a>
                </div>
                <div className={styles.section}>
                    <h1 className={styles.title}>
                        <svg className={styles.icon} height="16px" viewBox="0 0 24 24">
                            <path d="M16,7.999L16,12.999C16,13.795 16.316,14.558 16.879,15.121C17.441,15.683 18.204,15.999 19,15.999C19.796,15.999 20.559,15.683 21.121,15.121C21.684,14.558 22,13.795 22,12.999L22,11.999C22,9.742 21.236,7.552 19.833,5.784C18.43,4.016 16.471,2.775 14.273,2.262C12.075,1.749 9.768,1.994 7.727,2.959C5.687,3.923 4.032,5.549 3.033,7.573C2.034,9.597 1.749,11.899 2.224,14.106C2.699,16.312 3.907,18.293 5.651,19.726C7.394,21.159 9.571,21.96 11.828,21.999C14.085,22.037 16.288,21.312 18.08,19.939M16,11.999C16,14.209 14.209,15.999 12,15.999C9.791,15.999 8,14.209 8,11.999C8,9.79 9.791,7.999 12,7.999C14.209,7.999 16,9.79 16,11.999Z" />
                        </svg>
                        <span className={styles.label}>Socials</span>
                    </h1>
                    <div className={styles.socials}>
                        <a className={styles.link} href="https://github.com/sagemodeninja" target="_blank">
                            <Image src="/images/socials/github-mark.svg" alt="Socials - GitHub" width={24} height={24} />
                        </a>
                        <a className={styles.link} href="https://www.linkedin.com/in/garyantier" target="_blank">
                            <Image src="/images/socials/li-24.webp" alt="Socials - LinkedIn" width={28} height={24} />
                        </a>
                        <a className={styles.link} href="https://www.facebook.com/gary.antier.5" target="_blank">
                            <Image src="/images/socials/fb-24.webp" alt="Socials - Facebook" width={24} height={24} />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
