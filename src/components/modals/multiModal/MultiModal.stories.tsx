import { Meta, StoryObj } from "@storybook/react";
import MultiModal from "./MultiModal";

const meta: Meta<typeof MultiModal> = {
  title: 'COMPONENTS/MultiModal',
  component: MultiModal,
}

export default meta

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: args => (
    <MultiModal {...args} title="Create new product" />
  )
}

export const Secondary: Story = {
  render: args => (
    <MultiModal {...args} title="Edit" />
  )
}
