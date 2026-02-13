import { useNavigate, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import EmailConfirmation from "../../assets/icons/EmailConfirmation";

import styles from "./EmailConfirmationPage.module.css";

const EmailConfirmationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.state?.from) return;

        sessionStorage.setItem("registration_from", location.state.from);
    }, [location.state?.from]);

    const goBack = () => {
        navigate("/registration/email", { replace: true });
    };

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.mainBlock}>
                            <div className={styles.icon}><EmailConfirmation /></div>
                            <div className={styles.textBlock}>
                                <h1 className={styles.title}>Confirm your email address</h1>
                                <div className={styles.text}>We sent a confirmation email to:
                                    <span className={styles.mail} >hellohelena@gmail.com</span>
                                    Please check your email and click on the confirmation link.</div>
                            </div>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/registration/password", { state: { from: location.state?.from || location.pathname } })}>Continue</Button>
                    <ButtonReverse onClick={goBack}>Go back</ButtonReverse>
                </BottomBlock>
            </div>
        </>
    )
};

export default EmailConfirmationPage;