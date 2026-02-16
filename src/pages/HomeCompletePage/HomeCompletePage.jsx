import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";

import CheckIcon from "../../assets/icons/CheckIcon";
import ArrowDownGrey from "../../assets/icons/ArrowDownGrey";
import learnMore from "../../assets/images/learnMore.jpg"
import EditNotesGrey from "../../assets/icons/EditNotesGrey";
import ArrowRightGrey from "../../assets/icons/ArrowRightGrey";
import styles from "./HomeCompletePage.module.css";

const HomeCompletePage = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useLocation();

     const detailOptions = [    
        "18-24", "Mid-cycle", "Asian", "No symptoms"
    ];

    const hasDetails = detailOptions.length > 0;

    const detailsList = detailOptions.map((item) => (
        <div key={item} className={styles.item}>{item}</div>
    ));

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.title}>Hi, Helena</div>
                        <div className={styles.infoBlock}>
                            <div className={styles.visualBlock}>
                                <div className={styles.wrappingHeading}>
                                    <h4 className={styles.heading}>Your last pH result</h4>
                                    <div className={styles.wrapDate}>
                                        <div className={styles.date}>12.06.2025</div>
                                        <div className={styles.icon}><ArrowRightGrey /></div>
                                    </div>
                                </div>
                                <div className={styles.wrapNum}>
                                    <div className={styles.num}>7.35</div>
                                    <div className={styles.levelPh}>
                                        <CheckIcon />
                                        <p className={styles.levelPhText}>Normal pH</p>
                                    </div>
                                </div>
                            </div>

                            {hasDetails ? (
                                <>
                                    <div className={styles.details}>
                                        <div className={styles.wrapHeading}>
                                            <h4 className={styles.heading}>Details for this result</h4>
                                            <button
                                                className={styles.editBtn}
                                                onClick={() => navigate("/add-details", { state })}
                                                aria-label="Edit details"
                                            >
                                                <EditNotesGrey />
                                            </button>
                                        </div>
                                        <div className={styles.wrapDetailslList}>
                                            {detailsList}
                                        </div>
                                    </div>
                                    <div className={styles.recommendations}>
                                        <div className={`${styles.wrapHeading} ${styles.pointer}`} onClick={() => setIsOpen(!isOpen)}>
                                            <h3 className={styles.heading}>Recommendations</h3>
                                            <span className={`${styles.arrow} ${!isOpen ? styles.arrowOpen : ""}`}>
                                                <ArrowDownGrey />
                                            </span>
                                        </div>
                                        <div className={`${styles.wrapText} ${styles.collapse} ${!isOpen ? styles.open : ""}`}>
                                            <div className={styles.text}>
                                                <div className={styles.point}></div>
                                                <p className={styles.innerText}>
                                                    If you have symptoms (odor, itching, unusual discharge), we recommend speaking with a clinician for proper testing and treatment.
                                                </p>
                                            </div>
                                            <div className={styles.text}>
                                                <div className={styles.point}></div>
                                                <p className={styles.innerText}>
                                                    If you feel well, you can retest within 2–3 days to see if your pH returns to your usual range.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.wrapLearnMore}>
                                        <h2 className={styles.titleSecondary}>Learn more about your result</h2>
                                        <div className={styles.wrapLearnMoreInner}>
                                            <div className={styles.img}><img src={learnMore} alt="Learn more" /></div>
                                            <div className={styles.learnMore}>
                                                <div className={styles.learnMoreTitle}>
                                                    Why do I get yeast infections around my period?
                                                </div>
                                                <p className={styles.learnMoreText}>
                                                    Yeast infections are commonly associated with your period...
                                                </p>
                                                <a href="#" className={styles.learnMoreLink}>Learn more</a>
                                            </div>

                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className={styles.adviceBlock}>
                                    <div className={styles.heading}>Complete your health profile</div>
                                    <p className={styles.innerText}>Want to understand why your pH looks like this? Add your age group, hormone status, background, and current symptoms to get more tailored insights.</p>
                                    <Button className={styles.adviceBtn} onClick={() => navigate("/add-details")}>Add my details</Button>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/steps")}>Start new scan</Button>
                </BottomBlock>
            </div>
        </>
    )
};

export default HomeCompletePage;