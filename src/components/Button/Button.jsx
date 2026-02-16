import styles from "./Button.module.css";

const Button = ({ onClick, children, type = "button", className = "", disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.btn} ${className}`} 
            disabled={disabled}
        >
            {children}
        </button>
    )
};

export default Button;
