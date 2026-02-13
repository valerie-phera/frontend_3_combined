import { useState } from "react";
import Header from "./Header/Header";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import styles from "./AppLayout.module.css";

const AppLayout = ({
    headerVariant = "guest",
    children,
    showBack = false,
    onBack
}) => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <Header
                variant={headerVariant}
                isMenuOpen={isMenuOpen}
                onBurgerClick={() => setMenuOpen(true)}
                showBack={showBack}
                onBack={onBack}
            />

            {headerVariant === "auth" && (
                <BurgerMenu
                    isMenuOpen={isMenuOpen}
                    onClose={() => setMenuOpen(false)}
                />
            )}

            {/* wrapper for animation */}
            <main key={location.pathname} className={styles.page}>
                {children}
            </main>
        </>
    );
};

export default AppLayout;
