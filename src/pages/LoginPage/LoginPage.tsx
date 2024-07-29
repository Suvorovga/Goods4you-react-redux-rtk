import { useEffect, useRef } from "react";

import styles from "./loginPage.module.css";

import { useLoginMutation } from "src/store/login";
import { useAppDispatch } from "src/hooks/actions";
import { useAppSelector } from "src/hooks/redux";
import { Navigate } from "react-router-dom";

export const LoginPage = () => {
  // Тайтл для страницы авторизации
  document.title = "Sign in | Goods4you";

  // Получение id пользователя из стейта
  const userId = useAppSelector((state) => state.user.id);

  // Запрос на авторизацию
  const [login, { data, isLoading, isError }] = useLoginMutation();

  // Обновление стейта пользователя и сохранение токена
  const { setUser } = useAppDispatch();

  useEffect(() => {
    if (data && userId === 0) {
      localStorage.setItem("token", data.token);
      setUser({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    }
  }, [data]);

  // Получение значения полей в форме
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Событие submit формы
  const handleSubmit = () => {
    if (userNameRef.current && passwordRef.current)
      login({
        username: userNameRef.current?.value.trim(),
        password: passwordRef.current?.value.trim(),
      });
  };

  // Редирект на главную страницу в случае успешной авторизации
  if (userId) return <Navigate to={"/"} />;

  // Лоадер
  if (isLoading) return <p className={styles.message}>Please wait...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isError ? 'Something wrong...' : 'Sign in'}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className={styles.form}
        autoComplete="off"
      >
        <input
          required
          autoComplete="username"
          ref={userNameRef}
          className={styles.input}
          placeholder="Login"
          type="text"
        />
        <input
          required
          autoComplete="current-password"
          ref={passwordRef}
          className={styles.input}
          placeholder="Password"
          type="password"
        />
        <button className={styles.btn} type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};
