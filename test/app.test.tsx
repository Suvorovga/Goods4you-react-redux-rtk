import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "src/App";
import { store } from "src/store/store";

describe("Тест компонента App", () => {
  it("тест, проверяющий вход в приложение", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.findByText("Sign in")).toBeDefined();
  });
});
