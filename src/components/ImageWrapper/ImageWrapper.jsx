import styles from "./ImageWrapper.module.css";

const ImageWrapper = ({ src, alt, width, height }) => {
    return (
        <div
            className={styles.img}
            style={{ aspectRatio: `${width} / ${height}` }}
        >
            <img src={src} alt={alt} />
        </div>
    );
};

export default ImageWrapper;

// using:
// <ImageWrapper src={step5} alt="step 5" width={345} height={218} />