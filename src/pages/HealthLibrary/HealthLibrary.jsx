import { useNavigate, Link } from "react-router-dom";

import LibrarySlider from "../../components/LibrarySlider/LibrarySlider";
import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import healthLibrary from "../../assets/images/healthLibrary.jpg"
import ArrowRightBlack from "../../assets/icons/ArrowRightBlack";

import styles from "./HealthLibrary.module.css";

const librarySections = [
    {
        id: 1,
        title: "About care",
        articles: [
            { id: 1, caption: "Health article name here", image: healthLibrary, link: "#" },
            { id: 2, caption: "Health article name here", image: healthLibrary, link: "#" },
            { id: 3, caption: "Health article name here", image: healthLibrary, link: "#" },
            { id: 4, caption: "Health article name here", image: healthLibrary, link: "#" },
            { id: 5, caption: "Health article name here", image: healthLibrary, link: "#" },
        ],
    },
    {
        id: 2,
        title: "Sexual health",
        articles: [
            { id: 1, caption: "Health article name here", image: healthLibrary, link: "#" },
            { id: 2, caption: "Health article name here", image: healthLibrary, link: "#" },
            { id: 3, caption: "Health article name here", image: healthLibrary, link: "#" },
            { id: 4, caption: "Health article name here", image: healthLibrary, link: "#" },
            { id: 5, caption: "Health article name here", image: healthLibrary, link: "#" },
        ],
    },
];

const HealthLibrary = () => {
    const navigate = useNavigate();

    const elements = librarySections.map(section => (
        <div className={styles.libraryBlock} key={section.id}>
            <div className={styles.wrapHeading}>
                <h2 className={styles.heading}>{section.title}</h2>
                <Link to="/articles" className={styles.wrapSeeAll}>
                    <div className={styles.seeAll}>See all</div>
                    <ArrowRightBlack />
                </Link>
            </div>
            <LibrarySlider articles={section.articles} />
        </div>
    ))

    return (
        <>
            <div className={styles.content}>
                <div className={styles.containerInner}>
                    <h1 className={styles.title}>Health library</h1>
                    {elements}
                </div>
                <BottomBlock>
                    <Button onClick={() => navigate("/subscription")} >Unlock all articles</Button>
                </BottomBlock>
            </div >
        </>
    )
};

export default HealthLibrary;