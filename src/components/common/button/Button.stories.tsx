import { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: 'COMPONENTS/Common/Button',
  component: Button,
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: args => (
    <Button {...args} children="Add" />
  )
}
