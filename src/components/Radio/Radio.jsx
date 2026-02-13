import styles from "./Radio.module.css";

const Radio = ({
    name,
    value,
    checked,
    onChange,
    label,
}) => {
    return (
        <label className={styles.wrap}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={styles.input}
            />
            <span className={styles.custom} />
            <span className={styles.label}>{label}</span>
        </label>
    );
};

export default Radio;