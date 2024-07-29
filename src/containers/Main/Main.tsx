import { Routes, Route } from "react-router-dom";

import styles from './main.module.css'

import { CatalogPage } from "src/pages/CatalogPage/CatalogPage";
import { ProductPage } from "src/pages/ProductPage/ProductPage";
import { CartPage } from "src/pages/CartPage/CartPage";
import { LoginPage } from "src/pages/LoginPage/LoginPage";

export const Main = () => {
  return (
    <main className={styles.main}>
      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<div className={styles.error}>Not found</div>} />
      </Routes>
    </main>
  );
};
