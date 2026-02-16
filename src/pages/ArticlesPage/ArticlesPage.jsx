import { useNavigate, Link } from "react-router-dom";

import BottomBlock from "../../components/BottomBlock/BottomBlock";
import Button from "../../components/Button/Button";
import healthLibrary from "../../assets/images/healthLibrary.jpg"
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";

import styles from "./ArticlesPage.module.css";

export const articlesArr = [
    {
        id: 1,
        caption: "Health article name here",
        image: healthLibrary,
        link: "#"
    },
    {
        id: 2,
        caption: "Health article name here",
        image: healthLibrary,
        link: "#"
    },
    {
        id: 3,
        caption: "Health article name here",
        image: healthLibrary,
        link: "#"
    },
    {
        id: 4,
        caption: "Health article name here",
        image: healthLibrary,
        link: "#"
    },
    {
        id: 5,
        caption: "Health article name here",
        image: healthLibrary,
        link: "#"
    },
    {
        id: 6,
        caption: "Health article name here",
        image: healthLibrary,
        link: "#"
    },
];

const ArticlesPage = () => {
    const navigate = useNavigate();

    const list = articlesArr.map(item => (
        <div className={styles.wrapItem} key={item.id}>
            <div className={styles.img}>
                <ImageWrapper src={item.image} alt={item.caption} width={156} height={127} />
            </div>
            <h3 className={styles.heading}>{item.caption}</h3>
        </div>
    ))

    return (
        <>
            <div className={styles.content}>
                <div className={styles.containerInner}>
                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>About care</h1>
                        <div className={styles.articles}>
                            {list}
                        </div>
                    </div>
                </div>
                <BottomBlock>
                    <Button onClick={() => navigate("/subscription")} >Unlock all articles</Button>
                </BottomBlock>
            </div >
        </>
    )
};

export default ArticlesPage;