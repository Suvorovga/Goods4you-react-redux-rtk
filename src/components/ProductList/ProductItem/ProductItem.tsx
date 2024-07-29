import { FC, useEffect, useState } from "react";

import styles from "./productItem.module.css";

import { Link } from "react-router-dom";
import { CartButton } from "src/components/CartButton/CartButton";
import { IProduct } from "src/store/models/product.model";
import { useAppSelector } from "src/hooks/redux";

export interface CardItemProps {
  data: IProduct;
}

export const ProductItem: FC<CardItemProps> = ({ data }) => {
  // Проверка на наличие товара в корзине и получение его количества
  const [quantity, setQuantity] = useState(0);
  const cart = useAppSelector((state) => state.cart);

  const productsInCart = cart.carts[0]?.products;

  const productsIdInCart = productsInCart?.map((it) => it.id);
  const thisProductQuantityInCart = productsInCart?.find(
    (it) => it.id === data.id
  )?.quantity;

  useEffect(() => {
    if (productsIdInCart?.includes(data.id)) {
      setQuantity(thisProductQuantityInCart ? thisProductQuantityInCart : 0);
    }
  });

  // Проверка на наличие товара в магазине и перевод кнопки в состояние disable
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    if (quantity === data.stock) setDisable(true)
    else if (disable === true) setDisable(false)
  },[quantity])

  //Рассчет цены за товар с учетом скидки
  const price = (
    data.price -
    (data.price * data.discountPercentage) / 100
  ).toFixed(2);

  return (
    <article className={styles.container}>
      <Link
        className={styles.link}
        to={`/product/${data.id}`}
        onClick={() => {
          scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <div className={styles.img__container}>
          <img
            loading="lazy"
            className={styles.img}
            src={data.thumbnail}
            alt="Image"
          />
        </div>
        <h3
          className={
            quantity === 0 ? styles.title : `${styles.title} ${styles.title2}`
          }
        >
          {data.title}
        </h3>
        <span className={styles.price}>{`${price} $`}</span>
      </Link>
      <CartButton disable={disable} cartId={cart.carts[0]?.id} productId={data.id} quantity={quantity} type="catalog" />
    </article>
  );
};
