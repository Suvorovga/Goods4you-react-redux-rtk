import { FC, useState } from "react";

import styles from "./accordeonItem.module.css";

export interface AccordeonItemProps {
  question: string;
  answer: string;
  open?: boolean;
}

export const AccordeonItem: FC<AccordeonItemProps> = ({
  question,
  answer,
  open,
}) => {
  const [active, setActive] = useState(open ? true : false);

  return (
    <button
      onClick={() => setActive(active ? false : true)}
      className={styles.item}
    >
      <div className={active ? `${styles.text__container} ${styles.active}` : styles.text__container}>
        <h3 aria-label="Question" className={styles.text__title}>{question}</h3>
        <svg
          className={active ? `${styles.svg} ${styles.active}` : styles.svg}
          width="25"
          height="26"
          viewBox="0 0 25 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.9509 12.387L25 12.387V13.637L12.9509 13.637L12.9509 25.5002H11.5731L11.5731 13.637H0L0 12.387H11.5731V0.500244H12.9509V12.387Z"
            fill="white"
          />
        </svg>
      </div>
      <p aria-label="Answer" className={active ? `${styles.text} ${styles.active}` : styles.text}>
        {answer}
      </p>
    </button>
  );
};

