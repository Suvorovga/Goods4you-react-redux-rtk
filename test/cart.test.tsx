import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Cart } from "src/components/Menu/Cart/Cart";
import { store } from "src/store/store";

describe("Тест компонента Cart", () => {
  it("тест, проверяющий нулевое количество товаров в корзине", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.queryByText("0"));
  });
});
