import { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import styles from "./CameraViewPage.module.css";

import { useCameraReady } from "../../hooks/useCameraReady";
import { addImage } from "../../shared/api/images-api";

const CameraViewPage = () => {
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const isReady = useCameraReady(webcamRef);

    const videoConstraints = useMemo(() => ({
        facingMode: "environment",
        width: { ideal: 1920 },
        height: { ideal: 1080 },
    }), []);

    // Stop the camera when exiting
    useEffect(() => {
        return () => {
            const video = webcamRef.current?.video;
            video?.srcObject?.getTracks().forEach(track => track.stop());
        };
    }, []);

    const handleCapture = async () => {
        if (!webcamRef.current || isProcessing) return;

        setIsProcessing(true);

        try {
            const screenshot = webcamRef.current.getScreenshot({
                width: 1920,
                height: 1080
            });

            if (!screenshot) throw new Error("Screenshot failed");

            const blob = await fetch(screenshot).then(r => r.blob());

            const formData = new FormData();
            formData.append("image", blob, "capture.png");

            const res = await addImage(formData);

            if (!res || res.error) throw new Error("Backend error");

            setTimeout(() => {
                // navigate("/result-without-details", { state: res });
                navigate("/result-without-details", { state: { result: res } });
                setIsProcessing(false);
            }, 1000);


        } catch (err) {
            alert(`Failed: ${err.message}`);
        }
    };

    const onExit = () => {
        const video = webcamRef.current?.video;
        video?.srcObject?.getTracks().forEach(track => track.stop());

        navigate("/");
    };

    return (
        <div className={styles.cameraContainer}>

            <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                className={`${styles.webcamVideo} ${isReady ? styles.show : ""}`}
                onUserMediaError={() => {
                    alert("Camera error");
                    onExit();
                }}
                playsInline
            />

            <div className={styles.topControls}>
                <button className={styles.exitBtn} onClick={onExit}>X</button>
            </div>

            <div className={styles.viewfinder}>
                <div className={styles["bottom-left"]}></div>
                <div className={styles["bottom-right"]}></div>
            </div>

            <div className={styles.hintMessage}>
                <p className={styles.hintMessageTitle}>Align the test card in the frame</p>
            </div>

            <div className={styles.wrapBtn}>
                <button
                    className={styles.scanBtn}
                    onClick={handleCapture}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Capturing..." : "Simulate auto-capture"}
                </button>
            </div>
        </div>
    );
};

export default CameraViewPage;
