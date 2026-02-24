import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";

import ArrowDownGrey from "../../assets/icons/ArrowDownGrey";
import EditNotesGrey from "../../assets/icons/EditNotesGrey";
import CheckIcon from "../../assets/icons/CheckIcon";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import ShareIcon from "../../assets/icons/ShareIcon";
import ScaleMarker from "../../assets/icons/ScaleMarker";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import styles from "./ResultWithDetailsPageNormal.module.css";

const ResultWithDetailsPageNormal = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useLocation();
    const phValue = state?.phValue;
    const phLevel = state?.phLevel;
    const timestamp = state?.timestamp;

    useEffect(() => {
        if (!phValue) {
            navigate("/result-without-details");
        }
    }, [state, navigate]);

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

    const exportPdf = async (phValue, phLevel, date) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);

        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // === 1. Headline ===
        page.drawText("Vaginal pH Report", {
            x: 50,
            y: 750,
            size: 26,
            font,
            color: rgb(0, 0, 0.2),
        });

        // === 2. pH data ===
        page.drawText(`pH Value: ${phValue}`, { x: 50, y: 700, size: 16, font });
        page.drawText(`Level: ${phLevel}`, { x: 50, y: 670, size: 16, font });

        // === 3. Date ===
        let dateObj;
        if (!date) {
            dateObj = new Date(); // if there is no date - current
        } else {
            dateObj = new Date(date);
            if (isNaN(dateObj.getTime())) dateObj = new Date(); // if the line is incorrect, it is the current one
        }

        page.drawText(
            `Generated at: ${dateObj.toLocaleString()}`,
            { x: 50, y: 640, size: 12, font, color: rgb(0.1, 0.1, 0.1) }
        );

        // === 4. Interpretation ===
        const interpretation =
            phLevel === "Low"
                ? "Your result indicates acidic vaginal environment below the typical range."
                : phLevel === "Normal"
                    ? "Your result is within healthy vaginal pH range."
                    : "Your result is elevated, which can indicate imbalance or infection symptoms.";

        page.drawText("Interpretation:", { x: 50, y: 610, size: 14, font });
        page.drawText(interpretation, { x: 50, y: 585, size: 12, font, maxWidth: 500 });

        // === 5. pH color scale ===
        // const scaleX = 50;
        // const scaleY = 550;
        // const scaleWidth = 500;
        // const scaleHeight = 20;

        // const drawColorRect = (x, w, color) =>
        //     page.drawRectangle({ x, y: scaleY, width: w, height: scaleHeight, color });

        // drawColorRect(scaleX, scaleWidth * 0.33, rgb(1, 0.3, 0.3)); // Low
        // drawColorRect(scaleX + scaleWidth * 0.33, scaleWidth * 0.34, rgb(0.3, 1, 0.3)); // Normal
        // drawColorRect(scaleX + scaleWidth * 0.67, scaleWidth * 0.33, rgb(1, 0.8, 0.3)); // Elevated

        // === 6. Footer ===
        page.drawText(
            "pHera • Empowering vaginal health through accessible testing",
            { x: 50, y: 50, size: 10, font, color: rgb(0.3, 0.3, 0.3) }
        );

        // === 7. Saving PDF ===
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: "application/pdf" });
        saveAs(blob, "ph-report.pdf");
    };

    const minPh = 4.0;
    const maxPh = 7.0;

    const markerPos = ((phValue - minPh) / (maxPh - minPh)) * 100;

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
                                    <p className={styles.levelPhText}>{phLevel} pH</p>
                                </div>
                                <div className={styles.actions}>
                                    <div className={styles.actionsInner}><DownloadIcon /></div>
                                    <div className={styles.actionsInner}><ShareIcon /></div>
                                </div>
                            </div>
                            <div className={styles.num}>{phValue}</div>
                            <div className={styles.date}>{timestamp}</div>
                            <div className={styles.scale}>
                                <div className={styles.scalePart1}></div>
                                <div className={styles.scalePart2}></div>
                                <div className={styles.scalePart3}></div>
                                <div className={styles.scalePart4}></div>
                                <div className={styles.scalePart5}></div>
                                <ScaleMarker className={styles.scaleMarker} style={{ left: `${markerPos}%` }} />
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
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => exportPdf(phValue, phLevel, timestamp)}>Export results</Button>
                </BottomBlock>
            </div>
        </>
    )
};

export default ResultWithDetailsPageNormal;