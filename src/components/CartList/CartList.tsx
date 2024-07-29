import { FC } from "react";

import styles from "./cartList.module.css";

import { ICart } from "src/store/models/cart.model";
import { CartItem } from "./CartItem/CartItem";

export interface CartListProps {
  data: ICart;
}

export const CartList: FC<CartListProps> = ({ data }) => {
  return (
    <ul className={styles.list}>
      {data.products.map((it) => (
        <li key={it.id}>
          <CartItem data={it} />
        </li>
      ))}
    </ul>
  );
};
