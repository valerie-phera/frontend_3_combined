import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import CheckIcon from "../../assets/icons/CheckIcon";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import ShareIcon from "../../assets/icons/ShareIcon";
import ScaleMarker from "../../assets/icons/ScaleMarker";

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

import styles from "./ResultWithoutDetailsPage.module.css";

const ResultWithoutDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [resultData, setResultData] = useState(null);

    // Retrieve pH result passed from previous page.
    // If no result found (e.g. user reloaded page), redirect back to camera flow.
    useEffect(() => {
        const stateData = location.state?.result;

        if (stateData) {
            setResultData(stateData);
            console.log("📊 Данные результата:", stateData);
        } else {
            console.warn("⚠️ Нет данных результата, перенаправление...");
            navigate("/camera-access");
        }
    }, [location, navigate]);

    if (!resultData) {
        return <div>Loading...</div>;
    }

    // Map numerical pH value to descriptive category
    const getPhLevel = (ph) => {
        if (ph < 5) return "Low";
        if (ph >= 5 && ph <= 6) return "Normal";
        return "Elevated";
    };

    // Extract pH, category and timestamp from backend response
    const phValue = resultData.phValue || 0.00;
    const phLevel = getPhLevel(phValue);
    const timestamp = resultData.date || new Date().toISOString();

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

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.title}>Your pH result</div>
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
                            <div className={styles.num}>{phValue.toFixed(2)}</div>
                            <div className={styles.date}>{timestamp}</div>
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
                        <div className={styles.textBlock}>
                            <p className={styles.textResult}>This result suggests that your vaginal environment is in its usual balance. Your pH can still shift slightly with your cycle, sex, or products you use, but nothing in this reading looks concerning on its own.</p>

                            <div className={styles.advice}>
                                <h3 className={styles.heading}>Make this result more personal</h3>
                                <p className={styles.text}>Want to understand why your pH looks like this? Add your age group, hormone status, background, and current symptoms to get more tailored insights.</p>
                                <div className={styles.btnTop}>
                                    <Button onClick={() => navigate("/add-details")}>Add my details</Button>
                                </div>
                                <p className={styles.info}>
                                    Your data stays private and is never shared without your consent
                                </p>
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

export default ResultWithoutDetailsPage;