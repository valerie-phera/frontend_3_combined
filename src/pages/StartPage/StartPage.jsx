import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";
import welcomeImage from "../../assets/images/welcomeImage.jpg";

import styles from "./StartPage.module.css";

const StartPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("reg_username");
    }, []);

    return (
        <>
            <div className={styles.content}>
                <Container>
                    <div className={styles.img}>
                        <ImageWrapper src={welcomeImage} alt="Start page img" width={345} height={285} />
                    </div>
                    <div className={styles.textBlock}>
                        <div className={styles.greeting}>WELCOME TO PHERA</div>
                        <h1 className={styles.heading}>Do you have an account?</h1>
                    </div>
                    <div className={styles.btnsBlock}>
                        <Button onClick={() => navigate("/registration/username")}>Create account</Button>
                        <ButtonReverse onClick={() => navigate("/login")}>Log In</ButtonReverse>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default StartPage