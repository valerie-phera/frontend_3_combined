import { memo, useState, useRef, useEffect } from "react";
import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./HormoneDiagnoses.module.css";

const options = [
    "Adenomyosis",
    "Amenorhea",
    "Cushing’s syndrome",
    "Diabetes",
    "Endometriosis",
    "Intersex status",
    "Thyroid disorder",
    "Uterine fibroids",
    "Polycystic ovary syndrome (PCOS)",
    "Premature ovarian insufficiency (POI)",
];

const HormoneDiagnoses = ({ hormoneDiagnoses, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef(null);

    const list = options.map((item) => {
        const isActive = hormoneDiagnoses.includes(item);

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
                title="Diagnoses related to hormones"
                onToggle={(e) => {
                    e.stopPropagation();
                    setIsOpen(v => !v);
                }}
                onToggleArrow={isOpen}>
            </InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`} onClick={(e) => e.stopPropagation()}>
                {list}
            </div>
        </div>
    );
};

export default memo(HormoneDiagnoses);



