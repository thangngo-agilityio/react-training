import { Meta, StoryObj } from "@storybook/react";
import ConfirmModal from "./ConfirmModal";

const meta: Meta<typeof ConfirmModal> = {
  title: 'COMPONENTS/ConfirmModal',
  component: ConfirmModal,
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: (args) => (
    <ConfirmModal {...args} />
  )
}
