import { Meta, StoryObj } from "@storybook/react";
import { AccordeonItem } from "./AccordeonItem";

const meta: Meta<typeof AccordeonItem> = {
  title: "Компоненты/Аккордеон",
  component: AccordeonItem,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AccordeonItem>;

export const close: Story = {
  name: "Закрытый",
  args: {
    open: false,
    question: "How can I return or exchange an item?",
    answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ad
          quia facilis molestiae quasi asperiores mollitia illum, odit
          dignissimos atque aperiam minima expedita numquam consequuntur quis
          ipsam, est odio deserunt?`,
  },
};

export const open: Story = {
  name: "Открытый",
  args: {
    open: true,
    question: "How can I return or exchange an item?",
    answer: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique ad
          quia facilis molestiae quasi asperiores mollitia illum, odit
          dignissimos atque aperiam minima expedita numquam consequuntur quis
          ipsam, est odio deserunt?`,
  },
};
