import { Meta, StoryObj } from '@storybook/react';
import Sort from './Sort';
import '../../../assets/css/main.css';

const meta: Meta<typeof Sort> = {
  title: 'COMPONENTS/Common/Sort',
  component: Sort
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
  render: (args) => (
    <Sort
      {...args}
      selectOptions={[
        {
          value: undefined,
          disabled: true,
          children: 'Sort by name'
        },
        {
          value: 'Default',
          disabled: false,
          children: 'Default'
        },
        {
          value: 'Ascending',
          disabled: false,
          children: 'Ascending'
        },
        {
          value: 'Descending',
          disabled: false,
          children: 'Descending'
        }
      ]}
    ></Sort>
  )
};
