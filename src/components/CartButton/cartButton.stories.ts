import {Meta, StoryObj} from '@storybook/react'

import { CartButton } from './CartButton'

const meta: Meta<typeof CartButton> = {
  title: 'Компоненты/Кнопка корзины',
  component: CartButton,
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<typeof CartButton>

export const noItem: Story = {
  name: 'Нет в корзине',
  args: {
    quantity: 0,
    type: 'product'
  }
}

export const oneItem: Story = {
  name: '1 в корзине',
  args: {
    quantity: 1,
    type: 'product'
  }
}

export const tenItems: Story = {
  name: '10 в корзине',
  args: {
    quantity: 10,
    type: 'product'
  }
}
