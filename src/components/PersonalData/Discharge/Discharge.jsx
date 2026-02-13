import { memo, useState, useRef, useEffect } from "react";

import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./Discharge.module.css";

const options = [
    "No discharge",
    "Creamy",
    "Sticky",
    "Egg white",
    "Clumpy white",
    "Grey and watery",
    "Yellow / Green",
    "Red / Brown",
];

const Discharge = ({ discharge, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef(null);

    const list = options.map((item) => {
        const isActive = discharge.includes(item);

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
                title="Discharge"
                onToggle={(e) => {
                    e.stopPropagation();
                    setIsOpen(v => !v);
                }}
                onToggleArrow={isOpen}>
                Discharge varies from person to person. It is influenced by your cycle, hygiene products, medications, stress, and a lot of other factors. Look out for discharge of unusual colour and texture.
            </InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`} onClick={(e) => e.stopPropagation()}>
                {list}
            </div>
        </div>
    );
};

export default memo(Discharge);



