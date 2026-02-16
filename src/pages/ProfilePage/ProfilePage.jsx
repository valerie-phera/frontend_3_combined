import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../../assets/icons/Eye";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("Helena");
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [password, setPassword] = useState("123456");
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const [showPassword, setShowPassword] = useState(false);


    const handleLogout = () => {
        // 1. clear token
        localStorage.removeItem("token");

        // 2. clear state (if it exists)
        // dispatch(logout())

        // 3. go to the login page
        navigate("/start", { replace: true });
    };

    return (
        <div className={styles.content}>
            <div className={styles.containerInner}>
                <h1 className={styles.title}>My profile</h1>

                <div className={styles.wrapper}>
                    {/* USERNAME */}
                    <div className={styles.item}>
                        <div className={styles.data}>
                            <div className={styles.heading}>Username</div>

                            {isEditingUsername ? (
                                <input
                                    className={styles.input}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={() => setIsEditingUsername(false)}      // finish editing on blur
                                    autoFocus
                                />
                            ) : (
                                <div className={styles.value}>{username}</div>
                            )}
                        </div>

                        <button
                            className={styles.btn}
                            onClick={() => setIsEditingUsername(true)}      // start editing
                        >
                            EDIT
                        </button>
                    </div>

                    {/* PASSWORD */}
                    <div className={styles.item}>
                        <div className={styles.data}>
                            <div className={styles.heading}>Password</div>

                            {isEditingPassword ? (
                                <input
                                    className={styles.input}
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setIsEditingPassword(false);
                                            setShowPassword(false);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <div className={styles.value}>{"•".repeat(password.length)}</div>
                            )}
                        </div>
                        {isEditingPassword && (
                            <div
                                className={styles.eyeWrapper}
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={() => setShowPassword(v => !v)}
                            >
                                <Eye className={styles.eyeIcon} />
                            </div>
                        )}

                        <button
                            className={styles.btn}
                            onClick={() => {
                                if (isEditingPassword) {
                                    setIsEditingPassword(false);
                                    setShowPassword(false);
                                } else {
                                    setIsEditingPassword(true);
                                }
                            }}
                        >
                            {isEditingPassword ? "DONE" : "EDIT"}
                        </button>


                    </div>

                    {/* LOGOUT */}
                    <div className={styles.item}>
                        <button className={styles.logout} onClick={handleLogout}>LOG OUT</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;