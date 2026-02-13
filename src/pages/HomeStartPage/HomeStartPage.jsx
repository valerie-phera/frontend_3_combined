import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Button from "../../components/Button/Button";
import ImageWrapper from "../../components/ImageWrapper/ImageWrapper";

import noTestHomeMain from "../../assets/images/noTestHomeMain.jpg";
import carouselStep1 from "../../assets/images/carousel/carouselHowItWorksStep1.jpg";
import carouselStep2 from "../../assets/images/carousel/carouselHowItWorksStep2.jpg";
import carouselStep3 from "../../assets/images/carousel/carouselHowItWorksStep3.jpg";
import library1 from "../../assets/images/library1.jpg";
import library2 from "../../assets/images/library2.jpg";

import styles from "./HomeStartPage.module.css";

const howItWorksData = [
  {
    id: 1,
    image: carouselStep1,
    title: "Scan your kit",
    text: "Scan the QR code on your pHera box to start the test. This helps us identify your kit and guide you through the process."
  },
  {
    id: 2,
    image: carouselStep2,
    title: "Allow camera access",
    text: "Give pHera one-time access to your camera, so it can scan your test-strip. pHera doesn’t take or save any photos - it checks the colors in real time to give you interpretation."
  },
  {
    id: 3,
    image: carouselStep3,
    title: "Get your result",
    text: "After you scan your strip, we’ll process the color and show your pH result within seconds — along with a clear explanation."
  }
];

const libraryData = [
  { id: 1, image: library1, text: "Lorem ipsum dolor" },
  { id: 2, image: library2, text: "Lorem ipsum dolor" },
  { id: 3, image: library1, text: "Lorem ipsum dolor" },
  { id: 4, image: library2, text: "Lorem ipsum dolor" },
  { id: 5, image: library1, text: "Lorem ipsum dolor" }
];

const CarouselItem = ({ image, title, text }) => (
  <div className={styles.carouselItem}>
    <div className={styles.carouselImg}>
      <ImageWrapper src={image} loading="lazy" alt={title} width={218} height={200} />
    </div>
    <h3 className={styles.carouselTitle}>{title}</h3>
    <p className={styles.carouselText}>{text}</p>
  </div>
);

const LibraryItem = ({ image, text }) => (
  <div className={styles.libraryItem}>
    <div className={styles.libraryImg}>
      <img src={image} alt={text} />
    </div>
    <p className={styles.libraryText}>{text}</p>
  </div>
);

const HomeStartPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.content} data-scroll-container>
      <div className={styles.containerInner}>

        {/* Greeting Block */}
        <div className={styles.greetingBlock}>
          <div className={styles.img}>
            <ImageWrapper src={noTestHomeMain} alt="tests" width={345} height={214} />
          </div>
          <div className={styles.wrapText}>
            <p className={styles.text}>
              A quick pH test helps you understand your vaginal balance and spot changes early — right from your phone. Have your pHera test box and strip ready. We’ll guide you step by step and scan your result automatically.
            </p>
          </div>
          <div className={styles.btn}>
            <Button onClick={() => navigate("/steps")}>Start new scan</Button>
          </div>
        </div>

        {/* How it works */}
        <div className={styles.howItWorksBlock}>
          <h2 className={styles.title}>How it works</h2>
          <Swiper className={`${styles.swiper} ${styles.howItWorksSwiper}`} slidesPerView="auto" spaceBetween={16}>
            {howItWorksData.map(item => (
              <SwiperSlide key={item.id}>
                <CarouselItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Health Library */}
        <div className={styles.libraryBlock}>
          <h2 className={styles.title}>Health Library</h2>
          <Swiper className={`${styles.swiper} ${styles.healthLibrarySwiper}`} slidesPerView="auto" spaceBetween={12}>
            {libraryData.map(item => (
              <SwiperSlide key={item.id}>
                <LibraryItem {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  );
};

export default HomeStartPage;




