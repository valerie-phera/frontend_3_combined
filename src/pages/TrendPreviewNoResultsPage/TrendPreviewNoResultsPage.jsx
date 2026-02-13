import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";
import trendPreview from "../../assets/images/trendPreview.jpg";
import ScaleMarkerSmall from "../../assets/icons/ScaleMarkerSmall";

import styles from "./TrendPreviewNoResultsPage.module.css";

const TrendPreviewNoResultsPage = () => {
    const navigate = useNavigate();
    const selectWrapperRef = useRef(null);

    // Flag to simulate whether trend data is available
    // Set to `true` to show trend preview, `false` to show empty state

    // const data = true;
    const data = false;

    // Dates available for comparison in the trend preview dropdown
    const dates = [
        "Aug 12, 2025",
        "Sep 05, 2025",
        "Oct 21, 2025",
        "Nov 18, 2025",
        "Dec 02, 2025",
    ];

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dates[0]);

    // Handle selection of a date from the dropdown
    const handleSelect = (date) => {
        setSelectedDate(date);
        setIsOpen(false);
    };

    useEffect(() => {
        // click out
        const handleClickOutside = (event) => {
            if (selectWrapperRef.current && !selectWrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Escape
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        {data ? (
                            <div className={styles.wrapper}>
                                <h1 className={styles.titleMain}>Short trends preview</h1>
                                <div className={styles.dataBlock}>
                                    <div className={styles.wrapSelect}>
                                        <div className={styles.titleSelect}>Select a past test to compare your results</div>
                                        <div className={styles.wrapDate}>
                                            <div className={styles.selectWrapper} ref={selectWrapperRef}>
                                                <div
                                                    className={styles.selectDate}
                                                    onClick={() => setIsOpen(prev => !prev)}
                                                >
                                                    {selectedDate}
                                                </div>

                                                <ul className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
                                                    {dates.map(date => (
                                                        <li
                                                            key={date}
                                                            className={styles.dropdownItem}
                                                            onClick={() => handleSelect(date)}
                                                        >
                                                            {date}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            <div className={styles.fixedDate}>Oct 12, 2025</div>
                                        </div>
                                    </div>
                                    <div className={styles.wrapScale}>
                                        <div className={styles.wrapHeading}>
                                            <div className={`${styles.dot} ${styles['dot--blue']}`}></div>
                                            <div className={styles.heading}>Your pH</div>
                                        </div>
                                        <div className={styles.scaleBlock}>
                                            <div className={styles.scaleItem}>
                                                <div className={styles.scale}>
                                                    <div className={styles.scalePart1}><ScaleMarkerSmall className={styles.scaleMarkerSmall} /></div>
                                                    <div className={styles.scalePart2}></div>
                                                    <div className={styles.scalePart3}></div>
                                                    <div className={styles.scalePart4}></div>
                                                    <div className={styles.scalePart5}></div>
                                                </div>
                                                <div className={styles.num}>7.1</div>
                                            </div>
                                            <div className={styles.scaleItem}>
                                                <div className={styles.scale}>
                                                    <div className={styles.scalePart1}><ScaleMarkerSmall className={styles.scaleMarkerSmall} /></div>
                                                    <div className={styles.scalePart2}></div>
                                                    <div className={styles.scalePart3}></div>
                                                    <div className={styles.scalePart4}></div>
                                                    <div className={styles.scalePart5}></div>
                                                </div>
                                                <div className={styles.num}>4.3</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.wrapDetails}>
                                        <div className={styles.wrapHeading}>
                                            <div className={`${styles.dot} ${styles['dot--green']}`}></div>
                                            <div className={styles.heading}>Your details</div>
                                        </div>
                                        <div className={styles.details}>
                                            <ul className={styles.list}>
                                                <li className={styles.item}>Sticky</li>
                                                <li className={styles.item}>Itchy</li>
                                                <li className={styles.item}>Sour</li>
                                                <li className={styles.item}>No discharge</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className={styles.wrapParagraf}>
                                        <p className={styles.paragraf}>Compared to your previous test, your vaginal pH has shifted.</p>
                                        <p className={styles.paragraf}>This change suggests a variation in your vaginal environment between these two points in time. Differences like this can be associated with factors such as cycle phase, hormonal changes, recent sexual activity, or vaginal products.</p>
                                        <p className={styles.paragraf}>At this stage, the comparison indicates a change — not a diagnosis. Tracking additional results helps clarify whether this shift is temporary or recurring.</p>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <>
                                <div className={styles.textBlock}>
                                    <h1 className={styles.title}>Unlock your Trends & Insights report by testing again</h1>
                                    <p className={styles.text}>Your microbiome changes in response to behaviors, hormones, treatments, and more. pHera Trends & Insights shows you how these changes are related and gets smarter over time: the more tests you take, the richer the insights.</p>
                                </div>
                                <div className={styles.img}>
                                    <div className={styles.innerImg}>
                                        <ImageWrapper src={trendPreview} alt="Trend-preview page img" width={257} height={367} />
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate(data ? "/subscription" : "/steps")}>{data ? "Unlock my trends" : "Start new scan"}</Button>
                </BottomBlock>
            </div>
        </>
    )
};

export default TrendPreviewNoResultsPage;