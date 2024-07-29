import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import "src/assets/styles/normalize.css";
import "src/assets/styles/app.css";

import { Header } from "./containers/Header/Header";
import { Main } from "./containers/Main/Main";
import { Footer } from "./containers/Footer/Footer";
import { useLazyMeQuery } from "./store/login";
import { useAppDispatch } from "./hooks/actions";
import { useAppSelector } from "./hooks/redux";

export const App = () => {
  // Получение токена из ls
  const token = localStorage.getItem('token')

  // Получение id пользователя из стейта
  const userId = useAppSelector(state => state.user.id)

  // Получение авторизации пользователя по токену при обновлении страницы
  const [fetchMe ,{data, isError}] = useLazyMeQuery()

  useEffect(() => {
    if (userId === 0)
    fetchMe(token)
  }, [userId])

  // Изменение локального стейта пользователя после получения данных
  const {setUser} = useAppDispatch()

  useEffect(() => {
    if (data && userId === 0)
    setUser({id: data.id, firstName: data.firstName, lastName: data.lastName})
  }, [data])

  return (
    <>
      {isError && userId === 0 && <Navigate to={"/login"} />}

      <Header />
      <Main />
      <Footer />
    </>
  );
};
