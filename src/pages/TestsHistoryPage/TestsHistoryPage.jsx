import { useNavigate, useLocation } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import ArrowRightBlackSmall from "../../assets/icons/ArrowRightBlackSmall";
import PhBadge from "../../components/PhBadge/PhBadge";

import styles from "./TestsHistoryPage.module.css";

const TestsHistoryPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const phLevel = state?.phLevel || "Normal";

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.title}>Test history</div>
                        <div className={styles.visualBlock}>
                            <div className={styles.wrappingHeading}>
                                <h4 className={styles.phTest}>pH test</h4>
                                <div className={styles.wrapDate}>
                                    <div className={styles.date}>12.06.2025</div>
                                    <div className={styles.icon}><ArrowRightBlackSmall /></div>
                                </div>
                            </div>
                            <div className={styles.wrapNum}>
                                <div className={styles.num}>7.35</div>
                                <PhBadge level={phLevel} />
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/camera-view")}>Start new scan</Button>
                </BottomBlock>
            </div>
        </>
    )
};

export default TestsHistoryPage;