import styles from "./ButtonReverse.module.css";

const ButtonReverse = ({ onClick, children }) => {
    return (
        <button type="button" onClick={onClick} className={styles.btn}>
            {children}
        </button>
    )
};

export default ButtonReverse;
