import { useParams } from "react-router-dom";

import styles from "./productPage.module.css";

import { ProductSection } from "src/sections/ProductSection/ProductSection";
import { useGetProductByIdQuery } from "src/store/api";

export const ProductPage = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useGetProductByIdQuery(id!);

  // Тайт для страницы товара
  document.title = `${data?.title} | Goods4you`;

  return (
    <>
      {isLoading && <p className={styles.message}>Please wait...</p>}

      {isError && <p className={styles.message}>Something wrong...</p>}

      {data && <ProductSection data={data}/>}
    </>
  );
};
