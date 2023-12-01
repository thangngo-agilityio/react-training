import { Meta, StoryObj } from "@storybook/react";
import ProductCard from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: 'COMPONENTS/Common/ProductCard',
  component: ProductCard,
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  args: {
    product: {
      id: '0',
      name: 'Bun dau mam tom',
      image: "https://reviewnhatrang.com.vn/wp-content/uploads/2023/04/bun-dau-mam-tom-nha-trang-2.jpg", price: 2,
      quantity: 1
    }
  }
}
