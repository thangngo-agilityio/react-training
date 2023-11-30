import { Meta, StoryObj } from "@storybook/react";
import AddCard from "./AddCard";

const meta: Meta<typeof AddCard> = {
  title: 'COMPONENTS/COMMON/AddCard',
  component: AddCard,
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: (args) => (
    <AddCard {...args} />
  )
}
