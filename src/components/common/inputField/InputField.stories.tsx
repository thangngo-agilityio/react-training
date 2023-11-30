import { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: 'COMPONENTS/Common/InputField',
  component: InputField
}

export default meta

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: args => (
    <InputField {...args} inputClass="form-input"/>
  )
}
