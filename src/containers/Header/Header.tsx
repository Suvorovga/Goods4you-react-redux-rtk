import { Link } from "react-router-dom";

import styles from "./header.module.css";

import { Logo } from "src/components/Logo/Logo";
import { Menu } from "src/components/Menu/Menu";
import { useEffect } from "react";
import { useAsyncDispatch } from "src/hooks/actions";
import { fetchCartsByUser } from "src/store/slices/cart.slice";
import { useAppSelector } from "src/hooks/redux";

export const Header = () => {
  // Получение id пользователя из локального стейта
  const userId = useAppSelector((state) => state.user.id);

  // Запрос для получения корзины по id юзера
  const dispatch = useAsyncDispatch();

  useEffect(() => {
    if (userId > 0) {
      dispatch(fetchCartsByUser(userId))}
  }, [userId]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        {userId > 0 ? (
          <Link className={styles.link} to={"/"}>
            <Logo />
          </Link>
        ) : (
          <Link className={styles.link} to={"/login"}>
            <Logo />
          </Link>
        )}

        {userId > 0 && <Menu type="header" />}
      </div>
    </header>
  );
};
