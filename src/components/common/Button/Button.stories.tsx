import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'COMPONENTS/Common/Button',
  component: Button
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Button {...args} classButton="btn" children="Save" />
};

export const Secondary: Story = {
  render: (args) => (
    <Button
      {...args}
      classButton="btn-edit"
      type="button"
      children={<p className="edit-text">Edit dish</p>}
    />
  )
};
