import { memo, useState, useRef, useEffect } from "react";

import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./Urination.module.css";

const options = [
    "Frequent urination",
    "Burning sensation",
];

const Urination = ({ urination, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef(null);

    const list = options.map((item) => {
        const isActive = urination.includes(item);

        return (
            <div
                key={item}
                className={isActive ? styles.itemSelected : styles.item}
                onClick={() => onChange(item)}
            >
                <span>{item}</span>
            </div>
        );
    });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("touchstart", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, []);

    return (
        <div ref={wrapRef} className={styles.wrap} onClick={() => setIsOpen(v => !v)}>
            <InfoTooltip
                title="Urine"
                onToggle={(e) => {
                    e.stopPropagation();
                    setIsOpen(v => !v);
                }}
                onToggleArrow={isOpen}>
                It is normal to urinate more often after drinking more fluids, coffee, or during periods of stress. A brief burning sensation can happen after using a new product or after sex. If such sensations last a long time or appear with other symptoms, they may signal an infection.
            </InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`} onClick={(e) => e.stopPropagation()}>
                {list}
            </div>
        </div>
    );
};

export default memo(Urination);



