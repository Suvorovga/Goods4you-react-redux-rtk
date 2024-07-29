import { FC, useEffect } from "react";

import styles from "./cartButtonMore.module.css";

import { useAsyncDispatch } from "src/hooks/actions";
import { updateCart } from "src/store/slices/cart.slice";
import { useAppSelector } from "src/hooks/redux";

export interface CartButtonMoreProps {
  quantity: number;
  cartId: number;
  productId: number;
  disable?: boolean;
}

export const CartButtonMore: FC<CartButtonMoreProps> = ({
  cartId,
  productId,
  quantity,
  disable,
}) => {
  // Значение из стейта о загрузке при нажатии на кнопку
  const isLoading = useAppSelector((state) => state.cart.isLoading);

  // Значение из стейта об ошибке при нажатии на кнопку
  const isError = useAppSelector((state) => state.cart.isError);

  const dispatch = useAsyncDispatch();

  useEffect(() => {
    if (isError === true) alert("Something wrong");
  }, [isError]);

  return (
    <>
      <button
        onClick={() => {
          dispatch(updateCart({ cartId, productId, quantity: quantity - 1 }));
        }}
        aria-label="Take away product"
        className={`${styles.minus} ${isLoading && `${styles.disabled}`}`}
      >
        <svg
          width="18"
          height="4"
          viewBox="0 0 18 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 3.50012L1.5 3.50012C0.671573 3.50012 0 2.82855 0 2.00012C0 1.17169 0.671573 0.500122 1.5 0.500122L16.5 0.500122C17.3284 0.500122 18 1.17169 18 2.00012C18 2.82855 17.3284 3.50012 16.5 3.50012Z"
            fill="white"
          />
        </svg>
      </button>
      <span
        aria-label="Product quantity"
        className={styles.text}
      >{`${quantity} ${quantity > 1 ? "items" : "item"}`}</span>
      <button
        onClick={() => {
          dispatch(updateCart({ cartId, productId, quantity: quantity + 1 }));
        }}
        aria-label="Add product"
        className={`${styles.plus} ${isLoading && `${styles.disabled}`} ${disable === true && `${styles.disable}`}`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 10L1 10C0.447715 10 0 9.55228 0 9C0 8.44772 0.447716 8 1 8L17 8C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10Z"
            fill="white"
          />
          <path
            d="M8 17L8 1C8 0.447715 8.44772 0 9 0C9.55228 0 10 0.447716 10 1L10 17C10 17.5523 9.55228 18 9 18C8.44772 18 8 17.5523 8 17Z"
            fill="white"
          />
        </svg>
      </button>
    </>
  );
};

