import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDown from "../../assets/icons/ArrowDown";
import EditNotesGrey from "../../assets/icons/EditNotesGrey";
import { scrollOpenedSectionIntoView } from "../../shared/utils/scrollAncestor";
import styles from "./ResultWithDetailsPage.module.css";

const OPEN_ANIMATION_MS = 640;
// const OPEN_ANIMATION_MS = 1640;
const REVEAL_SCROLL_MS = OPEN_ANIMATION_MS;

const revealAccordionIfNeeded = (scrollTargetEl, marginSourceEl) => {
    if (!scrollTargetEl) return () => {};

    const marginEl = marginSourceEl ?? scrollTargetEl;
    const scrollMarginTop = Number.parseFloat(window.getComputedStyle(marginEl).scrollMarginTop);
    const clearanceTop =
        Number.isFinite(scrollMarginTop) && scrollMarginTop > 0 ? scrollMarginTop : 8;

    return scrollOpenedSectionIntoView(scrollTargetEl, {
        clearanceTop,
        clearanceBottom: 12,
        durationMs: REVEAL_SCROLL_MS,
        startDelayMs: 0,
        scrollStrategy: "alignTop",
    });
};

const DetailsForResultAccordion = ({ sections, state }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isInert, setIsInert] = useState(true);
    const rootRef = useRef(null);
    const headerRef = useRef(null);
    const bodyWrapperRef = useRef(null);
    const prevOpenRef = useRef(isOpen);
    const cancelScrollRef = useRef(null);

    const stopRevealScroll = () => {
        cancelScrollRef.current?.();
        cancelScrollRef.current = null;
    };

    const onEditClick = (e) => {
        e.stopPropagation();
        navigate("/add-details/basic", { state });
    };

    const onToggle = () => {
        if (isOpen) {
            stopRevealScroll();
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

        const revealSection = () => {
            if (cancelled || didScroll || wasOpen || !isOpen) return;

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    if (cancelled || didScroll) return;
                    didScroll = true;
                    stopRevealScroll();
                    cancelScrollRef.current = revealAccordionIfNeeded(
                        headerRef.current ?? rootRef.current,
                        rootRef.current
                    );
                });
            });
        };

        const finishOpen = () => {
            if (cancelled) return;
            setIsInert(false);
            revealSection();
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

    useEffect(() => () => stopRevealScroll(), []);

    return (
        <div className={styles.detailsAccordionWrap}>
            <div ref={rootRef} className={styles.detailsAccordion}>
                <div ref={headerRef} className={styles.detailsAccordionHeader}>
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
