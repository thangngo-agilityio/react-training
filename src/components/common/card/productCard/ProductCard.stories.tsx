import { Meta, StoryObj } from "@storybook/react";
import ProductCard from "./ProductCard";

const meta: Meta<typeof ProductCard> = {
  title: 'COMPONENTS/Common/ProductCard',
  component: ProductCard,
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: (args) => (
    <ProductCard {...args} productImage="https://reviewnhatrang.com.vn/wp-content/uploads/2023/04/bun-dau-mam-tom-nha-trang-2.jpg" productName="Bun dau mam tom" productPrice={2} productQuantity={1} />
  )
}
