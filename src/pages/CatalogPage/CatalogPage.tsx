import { useEffect } from "react";

import { CatalogSection } from "src/sections/CatalogSection/CatalogSection";
import { FaqSection } from "src/sections/FaqSection/FaqSection";
import { HeroSection } from "src/sections/HeroSection/HeroSection";

export const CatalogPage = () => {
  // Тайтл для главной страницы
  document.title = 'Catalog | Goods4you'

  // Скролл после перехода с другой страницы до нужной секции
  useEffect(() => {
    setTimeout(() => {
      const scrollItem = window.location.hash.slice(1);
      const section = document.getElementById(`${scrollItem}`);

      if (section && !isNaN(section.offsetTop)) {
        scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }, 500);
  });

  return (
    <>
      <HeroSection />
      <CatalogSection />
      <FaqSection />
    </>
  );
};
