import { Link } from "react-router-dom";
import styles from "./heroSection.module.css";

export const HeroSection = () => {
  // Скролл до выбранной секции
  const handleClick = () => {
    setTimeout(() => {
      const scrollItem = window.location.hash.slice(1);
      const section = document.getElementById(`${scrollItem}`);

      if (section && !isNaN(section.offsetTop)) {
        scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }, 500);
  };

  return (
    <section className={styles.hero}>
      <div className={`container ${styles.container}`}>
        <span className={styles.background}>Goods4you</span>
        <div className={styles.description}>
          <h1 className={styles.title}>
            Any products from famous brands with worldwide delivery
          </h1>
          <p className={styles.text}>
            We sell smartphones, laptops, clothes, shoes and many other products
            at low prices
          </p>
          <Link
            aria-label="Catalog"
            onClick={handleClick}
            to={"/#catalog"}
            className={styles.btn}
          >
            Go to shopping
          </Link>
        </div>
      </div>
    </section>
  );
};
