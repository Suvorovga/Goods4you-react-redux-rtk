import { render, screen } from "@testing-library/react";
import { AccordeonItem } from "src/components/Accordeon/AccordeonItem/AccordeonItem";

describe("Тест компонента AccordeonItem", () => {
  it("тест, проверяющий текст по умолчанию", () => {
    render(
      <AccordeonItem
        question="How can I track the status of my order?"
        answer='After placing your order, you will receive a confirmation email
      containing your order number and a tracking link. You can also log in
      to your account on our website and go to the "My Orders" section to
      track your delivery status.'
      />
    );

    expect(
      screen.getByText(
        'After placing your order, you will receive a confirmation email containing your order number and a tracking link. You can also log in to your account on our website and go to the "My Orders" section to track your delivery status.'
      )
    ).toBeDefined();
  });
});
