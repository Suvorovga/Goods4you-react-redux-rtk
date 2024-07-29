import styles from "./faqSection.module.css";

import { Accordeon } from "src/components/Accordeon/Accordeon";

export const FaqSection = () => {
  return (
    <section id="faq" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>FAQ</h2>
        <Accordeon />
      </div>
    </section>
  );
};
