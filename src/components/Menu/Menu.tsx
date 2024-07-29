import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./menu.module.css";

import { Cart } from "./Cart/Cart";
import { AccountButton } from "./AccountButton/AccountButton";

export interface MenuProps {
  type: "header" | "footer";
}

export const Menu: FC<MenuProps> = ({ type }) => {
  // Скролл до выбранной секции
  const handleClick = () => {
    const scrollItem = window.location.hash.slice(1);
    const section = document.getElementById(`${scrollItem}`);

    if (section && !isNaN(section.offsetTop)) {
      scrollTo({
        top: section?.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav>
      <ul className={styles.list}>
        <li aria-label="Catalog" onClick={handleClick} className={styles.link}>
          <Link to={"/#catalog"}>Catalog</Link>
        </li>
        <li aria-label="Questions" onClick={handleClick} className={styles.link}>
          <Link to={"/#faq"}>FAQ</Link>
        </li>
        {type === "header" && (
          <>
            <li>
              <Cart />
            </li>
            <li>
              <AccountButton />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
