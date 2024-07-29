import styles from "./productList.module.css";

import { ProductItem } from "./ProductItem/ProductItem";
import { IProduct } from "src/store/models/product.model";
import { FC } from "react";

export interface ProductsListProps {
  data: IProduct[]
}

export const ProductList: FC<ProductsListProps> = ({data}) => {
    return (
      <ul className={styles.list}>
        {data?.map((it) => (
          <li key={it.id}>
            <ProductItem data={it} />
          </li>
        ))}
      </ul>
    );

};
