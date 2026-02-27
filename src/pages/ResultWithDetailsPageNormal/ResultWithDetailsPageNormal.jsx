import { useState, useEffect, useRef } from "react";
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
import JSZip from "jszip";
import { getInterpretation } from "../../shared/utils/getInterpretation";
import { getRecommendations } from "../../shared/utils/getRecomendations";
import logo_PDF from "../../assets/logo_PDF.png";

import styles from "./ResultWithDetailsPageNormal.module.css";

const ResultWithDetailsPageNormal = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useLocation();
    const phValue = state?.phValue;
    const phLevel = state?.phLevel;
    const timestamp = state?.timestamp;
    const interpretation = getInterpretation(phLevel);
    const currentRecommendations = getRecommendations(phLevel);
    const fileInputRef = useRef(null);

    useEffect(() => {
        // if (!phValue) {
        if (phValue === undefined || phValue === null) {
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

    const exportPdf = async (
        phValue,
        phLevel,
        timestamp,
        interpretation,
        detailOptions,
        recommendations
    ) => {
        try {
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([595, 842]); // A4
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            let y = 820;
            const lineHeight = 16;

            // const mainBlue = rgb(0.29, 0.56, 0.89);  // #4A90E2
            const mainColor = rgb(0, 0.2039, 0.2392);  // #00343D`
            // const lightBlue = rgb(0.43, 0.78, 1);
            const gray = rgb(0.4, 0.4, 0.4);
            const borderColor = rgb(0.9, 0.9, 0.95);

            const safe = (v) => (v ? String(v) : "");

            const drawLine = (x1, x2) => {
                page.drawLine({
                    start: { x: x1, y },
                    end: { x: x2, y },
                    thickness: 1,
                    color: borderColor
                });
                y -= 15;
            };

            const drawWrapped = (text, x, size, maxWidth = 480) => {
                const words = safe(text).split(" ");
                let line = "";

                words.forEach((w) => {
                    const t = line + w + " ";
                    const width = font.widthOfTextAtSize(t, size);

                    if (width > maxWidth) {
                        page.drawText(line, { x, y, size, font });
                        y -= lineHeight;
                        line = w + " ";
                    } else {
                        line = t;
                    }
                });

                if (line.trim()) {
                    page.drawText(line, { x, y, size, font });
                    y -= lineHeight;
                }
            };

            const drawBox = (title, callback) => {
                page.drawRectangle({
                    x: 40,
                    y: y - 10,
                    width: 515,
                    height: -5,
                    color: rgb(0.96, 0.98, 1)
                });

                y -= 30;

                page.drawText(title, {
                    x: 55,
                    y,
                    size: 14,
                    font,
                    color: mainColor
                });

                y -= 20;
                callback();
                y -= 15;
            };

            // ===== HEADER =====

            page.drawRectangle({
                x: 0,
                y: 780,
                width: 595,
                height: 70,
                color: mainColor
            });

            page.drawText("pHera — Vaginal pH Report", {
                x: 40,
                y: 815,
                size: 22,
                font,
                color: rgb(1, 1, 1)
            });

            page.drawText(safe(timestamp), {
                x: 450,
                y: 790,
                size: 12,
                font,
                color: rgb(1, 1, 1)
            });

            y = 750;

            // ===== MAIN SUMMARY =====

            page.drawText("Summary", {
                x: 40,
                y,
                size: 18,
                font,
                color: gray
            });

            y -= 25;

            page.drawText(`pH Value: `, { x: 40, y, size: 14, font });
            page.drawText(safe(phValue), { x: 120, y, size: 14, font, color: mainColor });
            y -= 18;

            page.drawText(`Level: `, { x: 40, y, size: 14, font });
            page.drawText(safe(phLevel), { x: 120, y, size: 14, font, color: mainColor });
            y -= 25;

            drawLine(40, 550);

            // ===== INTERPRETATION =====
            drawBox("Interpretation", () => {
                drawWrapped(interpretation, 55, 12);
            });

            // ===== DETAILS =====
            if (detailOptions.length > 0) {
                drawBox("Your Details", () => {
                    detailOptions.forEach((d) => drawWrapped(`• ${d}`, 60, 12));
                });
            }

            // ===== RECOMMENDATIONS =====
            if (recommendations.length > 0) {
                drawBox("Recommendations", () => {
                    recommendations.forEach((r) => drawWrapped(`• ${r}`, 60, 12));
                });
            }

            // ===== FOOTER =====
            page.drawText(
                "pHera • Empowering vaginal health through accessible testing",
                {
                    x: 40,
                    y: 40,
                    size: 10,
                    font,
                    color: gray
                }
            );

            // Uploading an image
            const logoImageBytes = await fetch(logo_PDF).then(res => res.arrayBuffer());
            const logoImage = await pdfDoc.embedPng(logoImageBytes);

            const logoWidth = 55; // regulate
            const logoHeight = (logoImage.height / logoImage.width) * logoWidth;

            // Draw the logo on the bottom right
            page.drawImage(logoImage, {
                x: 595 - logoWidth - 40,  // right indent
                y: 35,                    // bottom indent
                width: logoWidth,
                height: logoHeight
            });

            return await pdfDoc.save();
        } catch (err) {
            console.error("PDF generation failed:", err);
            throw err;
        }
    };

    const exportJson = (phValue, phLevel, timestamp, interpretation, detailOptions, recommendations) => {
        return JSON.stringify(
            {
                phValue,
                phLevel,
                timestamp,
                interpretation,
                details: detailOptions,
                recommendations
            },
            null,
            2
        );
    };

    const exportCsv = (phValue, phLevel, timestamp, interpretation, detailOptions, recommendations) => {
        const rows = [
            ["Parameter", "Value"],
            ["PH Value", phValue],
            ["PH Level", phLevel],
            ["Timestamp", timestamp],
            ["Interpretation", interpretation],
            ["Details", detailOptions.join(" | ")],
            ["Recommendations", recommendations.join(" | ")]
        ];

        return rows.map((r) => r.join(",")).join("\n");
    };

    const minPh = 4.0;
    const maxPh = 7.0;

    const markerPos = Math.min(100, Math.max(0, ((phValue - minPh) / (maxPh - minPh)) * 100));

    const handleExport = async () => {
        // 1. PDF
        const pdfBytes = await exportPdf(
            phValue,
            phLevel,
            timestamp,
            interpretation,
            detailOptions,
            currentRecommendations
        );

        // 2. JSON
        const jsonText = exportJson(
            phValue,
            phLevel,
            timestamp,
            interpretation,
            detailOptions || [],
            currentRecommendations || []
        );

        // 3. CSV
        const csvText = exportCsv(
            phValue,
            phLevel,
            timestamp,
            interpretation,
            detailOptions,
            currentRecommendations
        );

        // 4. Create ZIP
        const zip = new JSZip();

        zip.file("ph-report.pdf", pdfBytes);
        zip.file("ph-report.json", jsonText);
        zip.file("ph-report.csv", csvText);

        // 5. Generating ZIP
        const zipBlob = await zip.generateAsync({ type: "blob" });

        // 6. Download the archive
        saveAs(zipBlob, "phera-report.zip");
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);

                console.log("Imported data:", jsonData);
                // Here we can navigate, save data in state, context, etc.
                // navigate("/result-with-details", { state: jsonData });

            } catch (err) {
                console.error("Invalid JSON file", err);
                alert("Invalid JSON file");
            }
        };

        reader.readAsText(file);
    };

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
                                    <div className={styles.actionsInner} onClick={handleImportClick}><DownloadIcon /></div>
                                    <div className={styles.actionsInner} onClick={handleExport}><ShareIcon /></div>
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
                            <p className={styles.textResult}>{interpretation}</p>
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
                                    {currentRecommendations.map((rec, index) => (
                                        <div key={index} className={styles.text}>
                                            <div className={styles.point}></div>
                                            <p className={styles.innerText}>{rec}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={handleExport}>Export results</Button>
                    <Button onClick={handleImportClick}>Import results</Button>

                    <input
                        type="file"
                        accept="application/json"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                </BottomBlock>
            </div>
        </>
    )
};

export default ResultWithDetailsPageNormal;



// import { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// import BottomBlock from "../../components/BottomBlock/BottomBlock";
// import Button from "../../components/Button/Button";
// import Container from "../../components/Container/Container";

// import ArrowDownGrey from "../../assets/icons/ArrowDownGrey";
// import EditNotesGrey from "../../assets/icons/EditNotesGrey";
// import CheckIcon from "../../assets/icons/CheckIcon";
// import DownloadIcon from "../../assets/icons/DownloadIcon";
// import ShareIcon from "../../assets/icons/ShareIcon";
// import ScaleMarker from "../../assets/icons/ScaleMarker";

// import { useExport } from "../../hooks/useExport";
// import { getInterpretation } from "../../shared/utils/getInterpretation";
// import { getRecommendations } from "../../shared/utils/getRecomendations";
// import styles from "./ResultWithDetailsPageNormal.module.css";

// const ResultWithDetailsPageNormal = () => {
//     const navigate = useNavigate();
//     const [isOpen, setIsOpen] = useState(false);
//     const { state } = useLocation();
//     const phValue = state?.phValue;
//     const phLevel = state?.phLevel;
//     const timestamp = state?.timestamp;
//     const interpretation = getInterpretation(phLevel);
//     const currentRecommendations = getRecommendations(phLevel);
//     const fileInputRef = useRef(null);
//     const { handleExport } = useExport();

//     useEffect(() => {
//         // if (!phValue) {
//         if (phValue === undefined || phValue === null) {
//             navigate("/result-without-details");
//         }
//     }, [state, navigate]);

//     const birthControlValues = state?.birthControl
//         ? Object.values(state.birthControl).filter(Boolean)
//         : [];

//     const hormoneTherapyValues = state?.hormoneTherapy
//         ? [
//             state.hormoneTherapy.general,
//             ...(state.hormoneTherapy.hormoneReplacement || [])
//         ].filter(Boolean)
//         : [];

//     const fertilityJourneyValues = state?.fertilityJourney
//         ? [
//             state.fertilityJourney.currentStatus,
//             ...(state.fertilityJourney.fertilityTreatments || [])
//         ].filter(Boolean)
//         : [];

//     // Collect all user details from state and filter out empty or falsy values
//     // Combines multiple categories like age, menstrual cycle, hormones, and symptoms
//     const detailOptions = [
//         state?.age,
//         ...(state?.ethnicBackground?.length ? state.ethnicBackground : []),
//         ...(state?.menstrualCycle?.length ? state.menstrualCycle : []),
//         ...(state?.hormoneDiagnoses?.length ? state.hormoneDiagnoses : []),
//         ...birthControlValues,
//         ...hormoneTherapyValues,
//         ...fertilityJourneyValues,
//         ...(state?.discharge?.length ? state.discharge : []),
//         ...(state?.vulvaCondition?.length ? state.vulvaCondition : []),
//         ...(state?.smell?.length ? state.smell : []),
//         ...(state?.urination?.length ? state.urination : []),
//     ].filter(Boolean);

//     const detailsList = detailOptions.map((item, index) => (
//         <div key={index} className={styles.item}>{item}</div>
//     ));

//     const minPh = 4.0;
//     const maxPh = 7.0;

//     const markerPos = Math.min(100, Math.max(0, ((phValue - minPh) / (maxPh - minPh)) * 100));

//     const handleImportClick = () => {
//         fileInputRef.current?.click();
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();

//         reader.onload = (event) => {
//             try {
//                 const jsonData = JSON.parse(event.target.result);

//                 console.log("Imported data:", jsonData);
//                 // Here we can navigate, save data in state, context, etc.
//                 // navigate("/result-with-details", { state: jsonData });

//             } catch (err) {
//                 console.error("Invalid JSON file", err);
//                 alert("Invalid JSON file");
//             }
//         };

//         reader.readAsText(file);
//     };

//     const exportData = {
//         phValue,
//         phLevel,
//         timestamp,
//         interpretation,
//         details: detailOptions,
//         recommendations: currentRecommendations
//     };

//     return (
//         <>
//             <div className={styles.content} data-scroll-container>
//                 <Container>
//                     <div className={styles.containerInner}>
//                         <h1 className={styles.title}>Your pH result</h1>
//                         <div className={styles.visualBlock}>
//                             <div className={styles.visualBlockTop}>
//                                 <div className={styles.levelPh}>
//                                     <CheckIcon />
//                                     <p className={styles.levelPhText}>{phLevel} pH</p>
//                                 </div>
//                                 <div className={styles.actions}>
//                                     <div className={styles.actionsInner} onClick={() => handleExport(exportData)}><DownloadIcon /></div>
//                                     <div className={styles.actionsInner} onClick={handleImportClick}><ShareIcon /></div>
//                                 </div>
//                             </div>
//                             <div className={styles.num}>{phValue}</div>
//                             <div className={styles.date}>{timestamp}</div>
//                             <div className={styles.scale}>
//                                 <div className={styles.scalePart1}></div>
//                                 <div className={styles.scalePart2}></div>
//                                 <div className={styles.scalePart3}></div>
//                                 <div className={styles.scalePart4}></div>
//                                 <div className={styles.scalePart5}></div>
//                                 <ScaleMarker className={styles.scaleMarker} style={{ left: `${markerPos}%` }} />
//                             </div>
//                             <div className={styles.meaning}>
//                                 <p>Low</p>
//                                 <p>Normal</p>
//                                 <p>Elevated</p>
//                             </div>
//                         </div>
//                         <div className={styles.infoBlock}>
//                             <p className={styles.textResult}>{interpretation}</p>
//                             <div className={styles.details}>
//                                 <div className={styles.wrapHeading}>
//                                     <h4 className={styles.heading}>Details for this result</h4>
//                                     <button
//                                         className={styles.editBtn}
//                                         onClick={() => navigate("/add-details", { state })}
//                                         aria-label="Edit details"
//                                     >
//                                         <EditNotesGrey />
//                                     </button>
//                                 </div>
//                                 <div className={styles.wrapDetailslList}>
//                                     {detailsList}
//                                 </div>
//                             </div>
//                             <div className={styles.recommendations}>
//                                 <div className={styles.wrapHeading} onClick={() => setIsOpen(!isOpen)}>
//                                     <h3 className={styles.heading}>Recommendations</h3>
//                                     <span className={`${styles.arrow} ${!isOpen ? styles.arrowOpen : ""}`}>
//                                         <ArrowDownGrey />
//                                     </span>
//                                 </div>
//                                 <div className={`${styles.wrapText} ${styles.collapse} ${!isOpen ? styles.open : ""}`}>
//                                     {currentRecommendations.map((rec, index) => (
//                                         <div key={index} className={styles.text}>
//                                             <div className={styles.point}></div>
//                                             <p className={styles.innerText}>{rec}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </Container>
//                 <BottomBlock>
//                     {/* <Button onClick={handleExport}>Export results</Button> */}
//                     <Button onClick={() => handleExport(exportData)}>Export results</Button>
//                     <Button onClick={handleImportClick}>Import results</Button>

//                     <input
//                         type="file"
//                         accept="application/json"
//                         style={{ display: "none" }}
//                         ref={fileInputRef}
//                         onChange={handleFileUpload}
//                     />
//                 </BottomBlock>
//             </div>
//         </>
//     )
// };

// export default ResultWithDetailsPageNormal;