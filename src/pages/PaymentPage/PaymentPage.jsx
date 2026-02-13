import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";

import styles from "./PaymentPage.module.css";

const PaymentPage = () => {
    const navigate = useNavigate();
    const yearlyRef = useRef(null);
    const monthlyRef = useRef(null);
    const [activePlan, setActivePlan] = useState("yearly");

    const handleKeyDown = (e, plan) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActivePlan(plan);
            return;
        }

        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
            e.preventDefault();
            setActivePlan("monthly");
            monthlyRef.current?.focus();
        }

        if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
            e.preventDefault();
            setActivePlan("yearly");
            yearlyRef.current?.focus();
        }
    };

    useEffect(() => {
        if (activePlan === "yearly") {
            yearlyRef.current?.focus();
        } else {
            monthlyRef.current?.focus();
        }
    }, []);

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Subscribe now</h1>
                            <p className={styles.text}>Personalize your tracking, uncover your unique patterns, and access unlimited expert-backed articles with guidance and tips from our medical team.</p>
                        </div>
                        <div className={styles.wrapPayment}
                            role="radiogroup"
                            aria-label="Subscription plan"
                        >
                            {/* YEARLY */}
                            <div
                                ref={yearlyRef}
                                className={`${styles.BlockPayment} ${activePlan === "yearly" ? styles.active : ""}`}
                                role="radio"
                                aria-checked={activePlan === "yearly"}
                                tabIndex={activePlan === "yearly" ? 0 : -1}
                                onClick={() => setActivePlan("yearly")}
                                onKeyDown={(e) => handleKeyDown(e, "yearly")}
                            >
                                {activePlan === "yearly" && (
                                    <div className={styles.badge}>BEST VALUE</div>
                                )}
                                <div className={styles.data}>
                                    <div className={styles.period}>Yearly</div>
                                    <div className={styles.value}>€9.99</div>
                                    <div className={styles.periodicity}>Charged every 12 months</div>
                                </div>
                                <div className={`${styles.statusIndicator} ${activePlan === "yearly" ? styles.checked : ""}`} />
                            </div>

                            {/* MONTHLY */}
                            <div
                                ref={monthlyRef}
                                className={`${styles.BlockPayment} ${activePlan === "monthly" ? styles.active : ""}`}
                                role="radio"
                                aria-checked={activePlan === "monthly"}
                                tabIndex={activePlan === "monthly" ? 0 : -1}
                                onClick={() => setActivePlan("monthly")}
                                onKeyDown={(e) => handleKeyDown(e, "monthly")}
                            >
                                <div className={styles.data}>
                                    <div className={styles.period}>Monthly</div>
                                    <div className={styles.value}>€11.00</div>
                                    <div className={styles.periodicity}>Charged every month</div>
                                </div>
                                <div className={`${styles.statusIndicator} ${activePlan === "monthly" ? styles.checked : ""}`} />
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button >Continue</Button>
                    <ButtonReverse onClick={() => navigate("/subscription")}>Go back</ButtonReverse>
                </BottomBlock>
            </div>
        </>
    )
};

export default PaymentPage;