import styles from "./traffic-light.module.scss";

type TrafficLightProps = {
    canMinimize?: boolean;
    canMaximize?: boolean;
}

const toggleDisabled = (isDisabled: boolean) =>
    isDisabled ? styles.disabled : "";

export default function TrafficLight({
    canMinimize = true,
    canMaximize = true,
}: TrafficLightProps) {
    return (
        <div className={styles.trafficLight}>
            <div className={`${styles.button} ${styles.red}`}></div>
            <div className={`${styles.button} ${styles.yellow} ${toggleDisabled(!canMinimize)}`}></div>
            <div className={`${styles.button} ${styles.green} ${toggleDisabled(!canMaximize)}`}></div>
        </div>
    );
}
