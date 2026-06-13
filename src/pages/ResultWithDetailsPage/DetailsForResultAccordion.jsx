import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "../../assets/icons/ArrowDown";
import EditNotesGrey from "../../assets/icons/EditNotesGrey";
import styles from "./ResultWithDetailsPage.module.css";

const OPEN_ANIMATION_MS = 420;

const scrollAccordionIntoView = (rootEl) => {
    if (!rootEl) return;

    requestAnimationFrame(() => {
        try {
            rootEl.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
        } catch {
            rootEl.scrollIntoView();
        }
    });
};

const DetailsForResultAccordion = ({ sections, state }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isInert, setIsInert] = useState(true);
    const rootRef = useRef(null);
    const bodyWrapperRef = useRef(null);
    const prevOpenRef = useRef(isOpen);

    const onEditClick = (e) => {
        e.stopPropagation();
        navigate("/add-details/basic", { state });
    };

    const onToggle = () => {
        if (isOpen) {
            setIsInert(true);
            setIsOpen(false);
            return;
        }

        setIsOpen(true);
    };

    useEffect(() => {
        const wasOpen = prevOpenRef.current;
        prevOpenRef.current = isOpen;

        const wrapperEl = bodyWrapperRef.current;
        if (!wrapperEl) return undefined;

        let cancelled = false;
        let didScroll = false;

        const finishOpen = () => {
            if (cancelled) return;

            setIsInert(false);

            if (wasOpen || !isOpen || didScroll) return;
            didScroll = true;
            scrollAccordionIntoView(rootRef.current);
        };

        const finishClose = () => {
            if (cancelled) return;
            setIsInert(true);
        };

        const onTransitionEnd = (event) => {
            if (event.target !== wrapperEl) return;
            if (event.propertyName !== "grid-template-rows") return;

            if (isOpen) {
                finishOpen();
                return;
            }

            finishClose();
        };

        wrapperEl.addEventListener("transitionend", onTransitionEnd);

        let fallbackTimer = 0;
        if (isOpen && !wasOpen) {
            fallbackTimer = window.setTimeout(finishOpen, OPEN_ANIMATION_MS + 50);
        } else if (!isOpen && wasOpen) {
            fallbackTimer = window.setTimeout(finishClose, OPEN_ANIMATION_MS + 50);
        }

        return () => {
            cancelled = true;
            window.clearTimeout(fallbackTimer);
            wrapperEl.removeEventListener("transitionend", onTransitionEnd);
        };
    }, [isOpen]);

    return (
        <div className={styles.detailsAccordionWrap}>
            <div ref={rootRef} className={styles.detailsAccordion}>
                <div className={styles.detailsAccordionHeader}>
                    <button
                        type="button"
                        className={styles.detailsAccordionToggle}
                        onClick={onToggle}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? "Collapse details for this result" : "Expand details for this result"}
                    >
                        <span className={styles.detailsAccordionTitle}>Details for this result</span>
                        <span
                            className={`${styles.detailsAccordionCaret} ${
                                isOpen ? styles.detailsAccordionCaretOpen : ""
                            }`.trim()}
                            aria-hidden
                        >
                            <ArrowDown />
                        </span>
                    </button>
                    <button
                        type="button"
                        className={styles.detailsAccordionEdit}
                        onClick={onEditClick}
                        aria-label="Edit details"
                    >
                        <EditNotesGrey />
                    </button>
                </div>

                <div
                    ref={bodyWrapperRef}
                    className={`${styles.detailsAccordionBodyWrapper} ${
                        isOpen ? styles.detailsAccordionBodyWrapperOpen : ""
                    }`.trim()}
                    aria-hidden={!isOpen}
                    inert={isInert || undefined}
                >
                    <div className={styles.detailsAccordionBodyInner}>
                        <div className={styles.detailsAccordionBody}>
                            {(sections ?? []).map((section) => (
                                <section key={section.title} className={styles.detailsAccordionSection}>
                                    <div className={styles.detailsAccordionSectionTitleRow}>
                                        <h5 className={styles.detailsAccordionSectionTitle}>
                                            {section.title}
                                        </h5>
                                        <hr className={styles.detailsAccordionSectionDivider} aria-hidden />
                                    </div>
                                    <div className={styles.detailsAccordionChips}>
                                        {section.items.map((item, idx) => (
                                            <span
                                                key={`${section.title}-${item}-${idx}`}
                                                className={styles.detailsAccordionChip}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsForResultAccordion;
