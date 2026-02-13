import { memo, useState, useRef, useEffect } from "react";

import InfoTooltip from "../../InfoTooltip/InfoTooltip";
import styles from "./Smell.module.css";

const options = [
    "Strong and unpleasant (“fishy”)",
    "Sour",
    "Chemical-like",
    "Very strong or rotten",
];

const Smell = ({ smell, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapRef = useRef(null);

    const list = options.map((item) => {
        const isActive = smell.includes(item);

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
                title="Smell"
                onToggle={(e) => {
                    e.stopPropagation();
                    setIsOpen(v => !v);
                }}
                onToggleArrow={isOpen}>
                A healthy vagina can have a natural scent that is metallic, musky, earthy, or tangy - all of these are normal! If you notice any of the unusual odors, such as those listed below, it might be helpful to mention them to your clinician.
            </InfoTooltip>
            <div className={`${styles.list} ${!isOpen ? styles.collapsed : ""}`} onClick={(e) => e.stopPropagation()}>                {list}
            </div>
        </div>
    );
};

export default memo(Smell);



