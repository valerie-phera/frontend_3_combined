import { useNavigate } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";
import welcomeImage from "../../assets/images/welcomeImage.jpg";

import styles from "./SubscriptionPage.module.css";

const SubscriptionPage = () => {
    const navigate = useNavigate();

    const goBack = () => {
        if (window.history.length > 2) {
            navigate(-1);
        } else {
            navigate("/");
        }
    };

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.containerInner}>
                        <div className={styles.img}>
                            <ImageWrapper src={welcomeImage} alt="Subscription page img" width={345} height={285} />
                        </div>
                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Unlock your full pHera experience</h1>
                            <p className={styles.text}>Get tailored insights, trusted education, and ongoing guidance designed around your body and your results.</p>
                        </div>
                    </div>
                </Container>
                <BottomBlock>
                    <Button onClick={() => navigate("/payment")}>Subscribe</Button>
                    <ButtonReverse onClick={() => navigate("/health-library")}>Maybe later</ButtonReverse>
                </BottomBlock>
            </div>
        </>
    )
};

export default SubscriptionPage;