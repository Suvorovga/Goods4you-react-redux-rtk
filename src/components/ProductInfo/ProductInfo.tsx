import { FC, useEffect, useState } from "react";
import { useAppSelector } from "src/hooks/redux";

import styles from "./productInfo.module.css";

import { CartButton } from "../CartButton/CartButton";
import { Raiting } from "./Raiting/Raiting";
import { IProduct } from "src/store/models/product.model";

export interface ProductInfoProps {
  data: IProduct
}

export const ProductInfo: FC<ProductInfoProps> = ({data}) => {
  // Получение данных из стейта о корзине пользователя
  const cart = useAppSelector(
    (state) => state.cart
  );

  const productsInCart = cart.carts[0]?.products

  // Округление рейтинга товара
  const raiting = Math.round(data.rating)

  // Вычисление цены со скидкой
  const price = (data.price - (data.price * data.discountPercentage / 100)).toFixed(2)

  // Проверка на наличие товара в корзине и получение его количества
  const [quantity, setQuantity] = useState(0)

  const productsIdInCart = productsInCart?.map((it) => it.id);
  const thisProductQuantityInCart = productsInCart?.find(it => it.id === data.id)?.quantity;

  useEffect(() => {
    if (productsIdInCart?.includes(data.id)) {
      setQuantity(thisProductQuantityInCart ? thisProductQuantityInCart : 0)
    }
  })

  // Проверка на наличие товара в магазине и перевод кнопки в состояние disable
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    if (quantity === data.stock) setDisable(true)
    else if (disable === true) setDisable(false)
  },[quantity])

  return (
    <div className={styles.info__container}>
      <h1 className={styles.title}>{data.title}</h1>
      <div className={styles.meta}>
        <Raiting raiting={raiting}/>
        <span className={styles.meta__descr}>
          {data.tags.join(', ')}
        </span>
      </div>
      <p className={styles.stock}>In Stock - Only {data.stock} left!</p>
      <p className={styles.content}>
        {data.description}
      </p>
      <div className={styles.other}>
        <p className={styles.info}>{data.warrantyInformation}</p>
        <p>{data.shippingInformation}</p>
      </div>
      <div className={styles.buy}>
        <div className={styles.prices__container}>
          <div className={styles.prices}>
            <p className={styles.price__discount}>{`${price}$`}</p>
            <p className={styles.price}>{`${data.price.toFixed(2)}$`}</p>
          </div>
          <div className={styles.discount__container}>
            <span className={styles.discount__descr}>Your discount:</span>
            <span className={styles.discount}>{`${data.discountPercentage}%`}</span>
          </div>
        </div>
        <CartButton disable={disable} cartId={cart.carts[0]?.id} productId={data.id} quantity={quantity} type="product" />
      </div>
    </div>
  );
};
