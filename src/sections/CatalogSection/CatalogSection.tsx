import { useEffect, useState } from "react";

import styles from "./catalogSection.module.css";

import {
  useGetProductsQuery,
  useLazyGetNextPageProductsQuery,
} from "src/store/api";
import { ProductList } from "src/components/ProductList/ProductList";
import { useDebounce } from "src/hooks/debounce";
import { IProduct } from "src/store/models/product.model";

export const CatalogSection = () => {
  // Стейт для массива товаров для отображения следующих 12 штук
  const [data, setData] = useState<IProduct[]>([]);

  // Стейт для значения поля поиска
  const [q, setQ] = useState("");

  // Стейт для загрузки следующих 12 товаров
  const [skip, setSkip] = useState(0);

  // Задержка при вводе текста в поле поиска
  const debouncedQ = useDebounce(q);

  // Получение массива с первыми 12 товарами
  const {
    data: productsResponse,
    isLoading,
    isError,
  } = useGetProductsQuery(debouncedQ);

  // Получение массива со следующими 12 товарами
  const [fetchNextPage, { data: nextProductsResponse, isError: nextProductsError }] =
    useLazyGetNextPageProductsQuery();

  // Обновление состояния загрузки при поиске
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    if (!searchLoading) setSearchLoading(true)
  },[q])

  // Обновление состояния загрузки следующих 12 товаров
  const [nextProductsLoading, setNextProductsLoading] = useState(false)

  // Создание массива продуктов и обновление загрузки при поиске
  useEffect(() => {
    if (productsResponse) {
      setData(productsResponse.products)
      setSearchLoading(false)
    };
  }, [productsResponse]);

  // Получение следующих 12 товаров при нажатии на кнопку и обновление загрузки
  useEffect(() => {
    if (skip > 0) {
      fetchNextPage({ q: debouncedQ, skip })
      setNextProductsLoading(true)
    };
  }, [skip]);

  // Добавление следующих 12 товаров и обновление загрузки
  useEffect(() => {
    if (nextProductsResponse) {
      setData((prev) => prev.concat(nextProductsResponse.products));
      setNextProductsLoading(false)
    }
  }, [nextProductsResponse]);


  return (
    <section id="catalog">
      <div className={`container ${styles.container}`}>
        <h2 className={styles.title}>Catalog</h2>
        <input
          placeholder="Search by title"
          type="search"
          className={styles.search}
          onChange={(e) => {
            setQ(e.target.value.trim());
          }}
        />
        {(isLoading || searchLoading) && <p className={styles.message}>Please wait...</p>}

        {isError && <p className={styles.message}>Something wrong...</p>}

        {data.length === 0 && q !== "" && !searchLoading && (
          <p className={styles.message}>No item...</p>
        )}

        {(productsResponse && !searchLoading) && <ProductList data={data} />}

        {nextProductsLoading && <p className={styles.message}>Please wait...</p>}

        {nextProductsError && <p className={styles.message}>Something wrong...</p>}

        <button
          aria-label="Show more products"
          onClick={() => {
            setSkip((prev) => prev + 12);
          }}
          className={
            data.length === productsResponse?.total || searchLoading ? styles.remove : styles.btn
          }
        >
          Show more
        </button>
      </div>
    </section>
  );
};
