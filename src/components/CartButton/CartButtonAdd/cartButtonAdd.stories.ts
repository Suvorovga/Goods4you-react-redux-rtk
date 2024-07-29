import { Meta, StoryObj } from "@storybook/react";

import { CartButtonAdd } from "./CartButtonAdd";

const meta: Meta<typeof CartButtonAdd> = {
  title: "Компоненты/Кнопка корзины/Нет в корзине",
  component: CartButtonAdd,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CartButtonAdd>;

export const noItem: Story = {
  name: "Нет в корзине",
  args: {
    type: "product",
  },
};
