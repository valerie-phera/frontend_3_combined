import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import EmptyFile from "../../assets/icons/EmptyFile";

import styles from "./TestsHistoryEmptyPage.module.css";

const TestsHistoryEmptyPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.mainBlock}>
                            <div className={styles.icon}><EmptyFile /></div>
                            <div className={styles.textBlock}>
                                <h1 className={styles.title}>Your test history will appear here</h1>
                                <div className={styles.text}>After your first scan, you’ll be able to see your past results here and notice patterns over time.</div>
                            </div>
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

export default TestsHistoryEmptyPage;