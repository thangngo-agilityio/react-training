import { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: 'COMPONENTS/Common/Spinner',
  component: Spinner
}

export default meta

type Story = StoryObj<typeof meta>

export const Base: Story = {
  render: (args) => (
    <Spinner {...args} />
  )
}
