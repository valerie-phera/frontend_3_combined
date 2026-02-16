import ArrowDown from "../../assets/icons/ArrowDown";
import styles from "./InfoHeader.module.css";

const InfoHeader = ({ title, isOpen, onToggle, rightSlot }) => {
    return (
        <div className={styles.header} onClick={onToggle}>
            <h4 className={styles.title}>{title}</h4>

            <div className={styles.right}>
                {rightSlot}

                <span
                    className={`${styles.arrow} ${
                        isOpen ? styles.arrowOpen : ""
                    }`}
                >
                    <ArrowDown />
                </span>
            </div>
        </div>
    );
};

export default InfoHeader;