import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import styles from "./LibrarySlider.module.css";

const LibrarySlider = ({ articles }) => {
  return (
    <Swiper className={`${styles.swiper} ${styles.librarySwiper}`} slidesPerView="auto" spaceBetween={10}>
      {articles.map(article => (
        <SwiperSlide key={article.id}>
          <div className={styles.libraryItem}>
            <div className={styles.libraryImg}>
              <img src={article.image} alt={article.caption} />
            </div>
            <p className={styles.libraryText}>{article.caption}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LibrarySlider;