import { Meta, StoryObj } from "@storybook/react";
import Toast from "./Toast";
import { ToastType } from "hooks/useToast";


const meta: Meta<typeof Toast> = {
  title: 'COMPONENTS/Common/Toast',
  component: Toast
}

export default meta

type Story = StoryObj<typeof meta>

export const Success: Story = {
  render: (args) => (
    <Toast {...args} message="Success" toastType={ToastType.SUCCESS} isShow={true} />
  )
}
export const Error: Story = {
  render: (args) => (
    <Toast {...args} message="Error" toastType={ToastType.ERROR} isShow={true} />
  )
}
