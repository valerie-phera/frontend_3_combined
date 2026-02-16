import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../../components/Button/Button";
import ButtonReverse from "../../components/ButtonReverse/ButtonReverse";
import Container from "../../components/Container/Container";
import Eye from "../../assets/icons/Eye";

import styles from "./RegistrationStepPassword.module.css";

const RegistrationStepPassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const { register, handleSubmit, watch, formState: { errors }, clearErrors, trigger } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: ""
        },
        mode: "onChange"
    });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false
    });

    const checks = {
        minLength: password.length >= 8,
        hasUpperAndLower: /[A-Z]/.test(password) && /[a-z]/.test(password),
        hasSymbol: /[#\$&]/.test(password),
        passwordsMatch: password === confirmPassword && confirmPassword.length > 0
    };

    const isFormValid = Object.values(checks).every(Boolean);

    const onSubmit = async ({ password }) => {  // simulated request
        try {
            setServerError("");

            await new Promise(res => setTimeout(res, 500));
            const token = "fake-token";

            localStorage.setItem("reg_token", token);
            navigate("/signup", { replace: true });
            setTimeout(() => {
                navigate("/home/complete");
            }, 0);
        } catch (e) {
            setServerError("Server error");
        }
    };

    // const onSubmit = async ({ password }) => {  // !!!!! real request to backend  !!!!!!!!!!
    //     try {
    //         setServerError("");

    //         // 1️⃣ запрос на backend
    //         const res = await registrPasswordApi(password);

    //         // 2️⃣ получаем token
    //         const token = res?.token;
    //         if (!token) {
    //             setServerError("Unexpected server response");
    //             return;
    //         }

    //         // 3️⃣ сохраняем токен для следующего шага
    //         localStorage.setItem("reg_token", token);

    //         // 4️⃣ переход на следующий шаг
    //         navigate("/signup/name");

    //     } catch (e) {
    //         setServerError(e?.response?.data?.message || "Server error");
    //     }
    // };

    const goBack = () => {
        navigate("/confirm-email", { replace: true });
    };

    return (
        <div className={styles.content}>
            <Container>
                <div className={styles.containerInner}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.crumbs}>
                            <div className={styles.itemColored}></div>
                            <div className={styles.itemColored}></div>
                            <div className={styles.itemColored}></div>
                        </div>

                        <div className={styles.textBlock}>
                            <h1 className={styles.heading}>Create a password</h1>
                            <p className={styles.text}>
                                Create a secure password to protect your account. You’ll use it to log in next time.
                            </p>
                        </div>

                        <div className={styles.dataSent}>
                            <div className={styles.itemInput}>
                                <label htmlFor="password" className={styles.label}>Password</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("password", {
                                            required: "Create your password",
                                            onChange: () => {
                                                clearErrors("password");
                                            },
                                            onBlur: () => setTouched(prev => ({ ...prev, password: true }))
                                        })}
                                        placeholder="Create your password"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className={styles.input}
                                        aria-invalid={!!errors.password}
                                    />
                                    <div className={styles.iconWrapper}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            setShowPassword(prev => !prev);
                                        }}
                                    >
                                        <Eye className={styles.icon} />
                                    </div>
                                </div>

                                <div className={styles.infoBlock}>
                                    <div className={`${styles.infoText} ${touched.password ? (checks.minLength ? styles.access : styles.error) : ""}`}>
                                        Use at least 8 characters
                                    </div>
                                    <div className={`${styles.infoText} ${touched.password ? (checks.hasUpperAndLower ? styles.access : styles.error) : ""}`}>
                                        Contains uppercase and lowercase letters
                                    </div>
                                    <div className={`${styles.infoText} ${touched.password ? (checks.hasSymbol ? styles.access : styles.error) : ""}`}>
                                        At least one symbol (# $ &)
                                    </div>
                                </div>

                                <label htmlFor="confirmPassword" className={styles.label}>Confirm your password</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        {...register("confirmPassword", {
                                            required: "Confirm your password",
                                            onChange: () => clearErrors("confirmPassword"),
                                            onBlur: () => setTouched(prev => ({ ...prev, confirmPassword: true }))
                                        })}
                                        placeholder="Confirm your password"
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className={styles.input}
                                        aria-invalid={!!errors.confirmPassword}
                                    />
                                    <div className={styles.iconWrapper}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            setShowConfirmPassword(prev => !prev);
                                        }}
                                    >
                                        <Eye className={styles.icon} />
                                    </div>
                                </div>
                                {touched.confirmPassword && confirmPassword.length > 0 && !checks.passwordsMatch && (
                                    <div className={`${styles.infoText} ${styles.error}`}>
                                        Passwords do not match
                                    </div>
                                )}
                            </div>
                        </div>

                        {serverError && <p className={styles.error}>{serverError}</p>}

                        <div className={styles.bottomBlock}>
                            <Button type="submit" className={!isFormValid ? styles.btnDisabled : ""} disabled={!isFormValid}>
                                Confirm
                            </Button>
                            <ButtonReverse onClick={goBack}>Go back</ButtonReverse>
                        </div>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default RegistrationStepPassword;

