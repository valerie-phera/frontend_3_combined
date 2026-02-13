import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";

import ArrowDownGrey from "../../assets/icons/ArrowDownGrey";
import learnMore from "../../assets/images/learnMore.jpg"
import EditNotesGrey from "../../assets/icons/EditNotesGrey";
import CheckIcon from "../../assets/icons/CheckIcon";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import ShareIcon from "../../assets/icons/ShareIcon";
import ScaleMarker from "../../assets/icons/ScaleMarker";
import styles from "./ResultWithDetailsPageNormal.module.css";

const ResultWithDetailsPageNormal = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useLocation();

    const birthControlValues = state?.birthControl
        ? Object.values(state.birthControl).filter(Boolean)
        : [];

    const hormoneTherapyValues = state?.hormoneTherapy
        ? [
            state.hormoneTherapy.general,
            ...(state.hormoneTherapy.hormoneReplacement || [])
        ].filter(Boolean)
        : [];

    const fertilityJourneyValues = state?.fertilityJourney
        ? [
            state.fertilityJourney.currentStatus,
            ...(state.fertilityJourney.fertilityTreatments || [])
        ].filter(Boolean)
        : [];

    // Collect all user details from state and filter out empty or falsy values
    // Combines multiple categories like age, menstrual cycle, hormones, and symptoms
    const detailOptions = [
        state?.age,
        ...(state?.ethnicBackground?.length ? state.ethnicBackground : []),
        ...(state?.menstrualCycle?.length ? state.menstrualCycle : []),
        ...(state?.hormoneDiagnoses?.length ? state.hormoneDiagnoses : []),
        ...birthControlValues,
        ...hormoneTherapyValues,
        ...fertilityJourneyValues,
        ...(state?.discharge?.length ? state.discharge : []),
        ...(state?.vulvaCondition?.length ? state.vulvaCondition : []),
        ...(state?.smell?.length ? state.smell : []),
        ...(state?.urination?.length ? state.urination : []),
    ].filter(Boolean);

    const detailsList = detailOptions.map((item) => (
        <div key={item} className={styles.item}>{item}</div>
    ));

    return (
        <>
            <div className={styles.content} data-scroll-container>
                <Container>
                    <div className={styles.containerInner}>
                        <h1 className={styles.title}>Your pH result</h1>
                        <div className={styles.visualBlock}>
                            <div className={styles.visualBlockTop}>
                                <div className={styles.levelPh}>
                                    <CheckIcon />
                                    <p className={styles.levelPhText}>Normal pH</p>
                                </div>
                                <div className={styles.actions}>
                                    <div className={styles.actionsInner}><DownloadIcon /></div>
                                    <div className={styles.actionsInner}><ShareIcon /></div>
                                </div>
                            </div>
                            <div className={styles.num}>7.35</div>
                            <div className={styles.date}>12.06.25 | 8:23 PM</div>
                            <div className={styles.scale}>
                                <div className={styles.scalePart1}><ScaleMarker className={styles.scaleMarker} /></div>
                                <div className={styles.scalePart2}></div>
                                <div className={styles.scalePart3}></div>
                                <div className={styles.scalePart4}></div>
                                <div className={styles.scalePart5}></div>
                            </div>
                            <div className={styles.meaning}>
                                <p>Low</p>
                                <p>Normal</p>
                                <p>Elevated</p>
                            </div>
                        </div>
                        <div className={styles.infoBlock}>
                            <p className={styles.textResult}>This result suggests that your vaginal environment is in its usual balance. Your pH can still shift slightly with your cycle, sex, or products you use, but nothing in this reading looks concerning on its own.</p>
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
                                <div className={styles.wrapHeading} onClick={() => setIsOpen(!isOpen)}>
                                    <h3 className={styles.heading}>Recommendations</h3>
                                    <span className={`${styles.arrow} ${!isOpen ? styles.arrowOpen : ""}`}>
                                        <ArrowDownGrey />
                                    </span>
                                </div>
                                <div className={`${styles.wrapText} ${styles.collapse} ${!isOpen ? styles.open : ""}`}>
                                    <div className={styles.text}>
                                        <div className={styles.point}></div>
                                        <p className={styles.innerText}>
                                            Keep following your usual routine — no changes are needed based on this result.
                                        </p>
                                    </div>
                                    <div className={styles.text}>
                                        <div className={styles.point}></div>
                                        <p className={styles.innerText}>
                                            If you notice new symptoms (odor, itching, unusual discharge), you can retest or talk to a clinician.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h2 className={styles.titleSecondary}>Learn more about your result</h2>
                            <div className={styles.wrapLearnMore}>
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
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/signup")}>Save to my history</Button>
                </BottomBlock>
            </div>
        </>
    )
};

export default ResultWithDetailsPageNormal;