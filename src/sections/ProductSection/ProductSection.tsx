import { FC, useEffect, useState } from "react";

import styles from "./productSection.module.css";

import { ProductInfo } from "src/components/ProductInfo/ProductInfo";
import { IProduct } from "src/store/models/product.model";

export interface ProductSectionProps {
  data: IProduct
}

export const ProductSection: FC<ProductSectionProps> = ({data}) => {
  // Отображение фотографий товаров в галлере
  const images = data.images;
  const [mainImg, setMainImg] = useState('');

  useEffect (() => {
    setMainImg(images[0])
  }, [data])

  return (
    <section className={styles.product__section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.images__container}>
          <img className={styles.main__img} src={mainImg} alt="Image" />
          {images.length > 1 && (
            <div className={styles.gallery}>
              {images.map((it) => (
                <img key={it} onClick={() => setMainImg(it)} className={mainImg === it ? `${styles.img} ${styles.img__choosen}` : styles.img} src={it} alt="Image" />
              ))}
            </div>
          )}
        </div>
        <ProductInfo data={data}/>
      </div>
    </section>
  );
};
