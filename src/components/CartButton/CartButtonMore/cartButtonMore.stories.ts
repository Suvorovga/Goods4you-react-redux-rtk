import { Meta, StoryObj } from "@storybook/react";

import { CartButtonMore } from "./CartButtonMore";

const meta: Meta<typeof CartButtonMore> = {
  title: "Компоненты/Кнопка корзины/Есть в корзине",
  component: CartButtonMore,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CartButtonMore>;

export const oneItem: Story = {
  name: "1 в корзине",
  args: {
    quantity: 1,
  },
};

export const tenItems: Story = {
  name: "10 в корзине",
  args: {
    quantity: 10,
  },
};
