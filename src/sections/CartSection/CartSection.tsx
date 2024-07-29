import { useAppSelector } from "src/hooks/redux";

import styles from "./cartSection.module.css";

import { CartList } from "src/components/CartList/CartList";

export const CartSection = () => {
  // Получение стейта с корзинами пользователя
  const state = useAppSelector((state) => state.cart.carts);

  // Получение состояния загрузки
  const isLoading = useAppSelector(state => state.cart.isLoading)

   // Получение состояния ошибки
   const isError = useAppSelector(state => state.cart.isError)

  // Получение состояния успеха
  const isSuccess = useAppSelector(state => state.cart.isSuccess)

  // Получение данных о первой корзине
  const data = state[0];

  return (
    <section className={styles.cart__section}>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.title}>My cart</h1>

        {isLoading && !data && <p className={styles.message}>Please wait...</p>}

        {isError && <p className={styles.message}>Something wrong...</p>}

        {(state.length === 0 && isSuccess) && <p className={styles.message}>No items</p>}

        {state.length > 0 && (
          <div className={styles.content}>
            <CartList data={data} />
            <div className={styles.total}>
              <div className={styles.top__container}>
                <div className={styles.total__container}>
                  <span className={styles.count}>Total count</span>
                  <span className={styles.count__item}>
                    {data.totalProducts}{" "}
                    {data.totalProducts > 1 ? "items" : "item"}
                  </span>
                </div>
                <div className={styles.total__container}>
                  <span className={styles.discount}>
                    Price without discount
                  </span>
                  <span className={styles.discount__item}>{data.total}$</span>
                </div>
              </div>
              <div className={styles.total__container}>
                <span className={styles.price}>Total price</span>
                <span className={styles.price__item}>
                  {data.discountedTotal}$
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
