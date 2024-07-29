import { FC } from "react";

import styles from "./cartButton.module.css";

import { CartButtonMore } from "./CartButtonMore/CartButtonMore";
import { CartButtonAdd } from "./CartButtonAdd/CartButtonAdd";
import { useAsyncDispatch } from "src/hooks/actions";
import { updateCart } from "src/store/slices/cart.slice";

export interface CartButtonProps {
  quantity: number;
  type: "catalog" | "cart" | "product";
  cartId: number;
  productId: number;
  disable?: boolean
}

export const CartButton: FC<CartButtonProps> = ({
  cartId,
  productId,
  quantity,
  type,
  disable,
}) => {
  const dispatch = useAsyncDispatch();

  if (quantity > 0) {
    switch (type) {
      case "catalog":
        return (
          <div className={styles.catalog}>
            <CartButtonMore
              disable={disable}
              cartId={cartId}
              productId={productId}
              quantity={quantity}
            />
          </div>
        );
      case "cart":
        return (
          <div className={styles.cart__container}>
            <div className={styles.cart}>
              <CartButtonMore
              disable={disable}
              cartId={cartId}
                productId={productId}
                quantity={quantity}
              />
            </div>
            <button
              onClick={() => {
                dispatch(updateCart({ cartId, productId, quantity: 0 }));
              }}
              className={styles.delete}
            >
              Delete
            </button>
          </div>
        );

      case "product":
        return (
          <div className={styles.product}>
            <CartButtonMore
              disable={disable}
              cartId={cartId}
              productId={productId}
              quantity={quantity}
            />
          </div>
        );
    }
  } else
    return <CartButtonAdd disable={disable} cartId={cartId} productId={productId} type={type} />;
};
