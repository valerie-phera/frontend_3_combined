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

import { saveAs } from "file-saver";
import JSZip from "jszip";
import { getInterpretation } from "../../shared/utils/getInterpretation";
import { getRecommendations } from "../../shared/utils/getRecomendations";
import useExportPdf from "../../hooks/useExportPdf";
import logo_PDF from "../../assets/logo_PDF.png";
import useDetailsFromState from "../../hooks/useDetailsFromState";

import styles from "./ResultWithDetailsPage.module.css";

const ResultWithDetailsPage = () => {
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
        if (phValue === undefined || phValue === null) {
            navigate("/result-without-details");
        }
    }, [state, navigate]);

    const detailOptions = useDetailsFromState(state);
    const detailsList = detailOptions.map((item) => (
        <div key={item} className={styles.item}>{item}</div>
    ));

    const { exportPdf } = useExportPdf(logo_PDF);
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

        const pdfBytes = await exportPdf({
            phValue,
            phLevel,
            timestamp,
            interpretation,
            detailOptions,
            recommendations: currentRecommendations
        });

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

export default ResultWithDetailsPage;