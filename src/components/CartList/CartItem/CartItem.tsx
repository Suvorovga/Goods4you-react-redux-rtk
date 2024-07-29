import { FC } from "react";
import { Link } from "react-router-dom";

import styles from "./cartItem.module.css";

import { CartButton } from "src/components/CartButton/CartButton";
import { IProductInCart } from "src/store/models/product.model";
import { useAppSelector } from "src/hooks/redux";

export interface CartItemProps {
  data: IProductInCart;
}

export const CartItem: FC<CartItemProps> = ({ data }) => {
  const cart = useAppSelector((state) => state.cart);

  return (
    <article className={styles.container}>
      <div className={styles.info__container}>
        <img className={`${styles.img} ${data.quantity === 0 && `${styles.empty}`}`} src={data.thumbnail} alt="Shoes" />
        <div className={styles.info}>
          <Link
            onClick={() => {
              scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className={styles.link}
            to={`/product/${data.id}`}
          >
            <h3 className={`${styles.info__text} ${data.quantity === 0 && `${styles.empty}`}`}>{data.title}</h3>
          </Link>
          <p className={`${styles.info__count} ${data.quantity === 0 && `${styles.empty}`}`}>{data.discountedTotal} $</p>
        </div>
      </div>
      <CartButton cartId={cart.carts[0]?.id} productId={data.id} quantity={data.quantity} type="cart" />
    </article>
  );
};
