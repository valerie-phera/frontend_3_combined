import { memo, useState, useRef, useEffect } from "react";

import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./VulvaCondition.module.css";

const options = [
    "Dry",
    "Itchy",
];

const VulvaCondition = ({ vulvaCondition, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef(null);

    const list = options.map((item) => {
        const isActive = vulvaCondition.includes(item);

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
                title="Vulva & Vagina"
                onToggle={(e) => {
                    e.stopPropagation();
                    setIsOpen(v => !v);
                }}
                onToggleArrow={isOpen}>
                It is normal to experience occasional dryness or itchiness - after shaving, using a new hygiene product, or wearing tight clothes. If such sensations become uncomfortable and appear along with other symptoms, they may signal an infection.
            </InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`} onClick={(e) => e.stopPropagation()}>
                {list}
            </div>
        </div>
    );
};

export default memo(VulvaCondition);



