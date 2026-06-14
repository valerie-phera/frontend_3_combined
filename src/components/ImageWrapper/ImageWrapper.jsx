import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { isImageCached, preloadImage } from "../../shared/utils/preloadImage";
import styles from "./ImageWrapper.module.css";

/**
 * Responsive illustration. Pass intrinsic asset pixels as width/height;
 * maxWidth sets the on-screen cap (defaults to width).
 */
const ImageWrapper = ({ src, alt, width, height, maxWidth, priority = false }) => {
    const hasIntrinsic = Number(width) > 0 && Number(height) > 0;
    const displayMax = maxWidth ?? width;
    const hasDisplayCap = Number(displayMax) > 0;

    const imgRef = useRef(null);
    const [loaded, setLoaded] = useState(() => isImageCached(src));

    useLayoutEffect(() => {
        const img = imgRef.current;
        if (img?.complete && img.naturalWidth > 0) {
            setLoaded(true);
        } else {
            setLoaded(isImageCached(src));
        }
    }, [src]);

    useEffect(() => {
        if (!src) return undefined;
        let cancelled = false;

        if (priority) {
            preloadImage(src).then(() => {
                if (!cancelled) setLoaded(true);
            });
        }

        return () => {
            cancelled = true;
        };
    }, [priority, src]);

    const markLoaded = () => setLoaded(true);

    const wrapperStyle = {};
    if (hasDisplayCap) {
        wrapperStyle.maxWidth = `${displayMax}px`;
    }
    if (hasIntrinsic) {
        wrapperStyle.aspectRatio = `${width} / ${height}`;
    }

    return (
        <div
            className={`${styles.img} ${hasIntrinsic ? styles.imgHasRatio : ""} ${loaded ? styles.imgReady : styles.imgPending}`}
            style={Object.keys(wrapperStyle).length ? wrapperStyle : undefined}
        >
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={priority ? "high" : "auto"}
                className={`${styles.imgEl} ${loaded ? styles.imgElVisible : ""}`}
                onLoad={markLoaded}
            />
        </div>
    );
};

export default ImageWrapper;
