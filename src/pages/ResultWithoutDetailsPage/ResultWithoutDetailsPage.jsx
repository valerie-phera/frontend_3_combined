import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import CheckIcon from "../../assets/icons/CheckIcon";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import ShareIcon from "../../assets/icons/ShareIcon";
import ScaleMarker from "../../assets/icons/ScaleMarker";
import { getInterpretation } from "../../shared/utils/getInterpretation";

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
            navigate("/");
        }
    }, [location, navigate]);

    if (!resultData) {
        return <div>Loading...</div>;
    }

    // Map numerical pH value to descriptive category
    const getPhLevel = (ph) => {
        if (ph < 4.8) return "Slightly Low";
        if (ph >= 4.8 && ph <= 6) return "Normal";
        if (ph >= 6.1 && ph <= 6.5) return "Slightly Elevated";
        return "Elevated";
    };

    // Extract pH, category and timestamp from backend response
    const phValue = resultData.phValue || 0.00;
    const phLevel = getPhLevel(phValue);
    const timestamp = resultData.date || new Date().toISOString();
    const interpretation = getInterpretation(phLevel);

    const minPh = 4.0;
    const maxPh = 7.0;

    const markerPos = ((phValue - minPh) / (maxPh - minPh)) * 100;

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
                        <div className={styles.textBlock}>
                            <p className={styles.textResult}>{interpretation}</p>

                            <div className={styles.advice}>
                                <h3 className={styles.heading}>Personalize results</h3>
                                <p className={styles.text}>Want to understand why your pH looks like this? Add your age group, hormone status, background, and current symptoms to get more tailored insights.</p>
                                <div className={styles.btnTop}>
                                </div>
                                <p className={styles.info}>
                                    Your data stays private and is never shared without your consent
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button
                        onClick={() =>
                            navigate("/add-details", {
                                state: {
                                    phValue,
                                    phLevel,
                                    timestamp,
                                    interpretation
                                },
                            })
                        }
                    >
                        Add my details
                    </Button>
                </BottomBlock>
            </div>
        </>
    )
};

export default ResultWithoutDetailsPage;