import styles from "../styles/spinner.module.css";
const Spinner = () => (
  <div className={styles.posCenter}>
    <div className={styles.loader}></div>;
  </div>
);

export default Spinner;
