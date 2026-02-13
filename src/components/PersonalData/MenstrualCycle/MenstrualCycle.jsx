import { memo, useState, useRef, useEffect } from "react";

import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./MenstrualCycle.module.css";

const options = [
    "Regular",
    "Irregular",
    "No period for 12+ months",
    "Never had a period",
    "Perimenopause",
    "Postmenopause",
];

const MenstrualCycle = ({ menstrualCycle, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef(null);

    const list = options.map((item) => {
        const isActive = menstrualCycle.includes(item);

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
            <InfoTooltip title="Menstrual cycle" onToggle={(e) => {
                e.stopPropagation();
                setIsOpen(v => !v);
            }} onToggleArrow={isOpen}></InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`} onClick={(e) => e.stopPropagation()}>
                {list}
            </div>
        </div>
    );
};

export default memo(MenstrualCycle);



