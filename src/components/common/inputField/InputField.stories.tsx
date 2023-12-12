import { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';
import iconSearch from '../../../assets/icon/icon_search.svg';

const meta: Meta<typeof InputField> = {
  title: 'COMPONENTS/Common/InputField',
  component: InputField
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <InputField {...args} label="Name" labelClass="form-title" inputClass="form-input" />
  )
};

export const Search: Story = {
  render: (args) => (
    <form className="form-search">
      <img src={iconSearch} className="icon-search" loading="eager" alt="search" />
      <InputField
        {...args}
        type="search"
        inputClass="input-search"
        placeholder="Search for food, coffe, etc.."
      />
    </form>
  )
};
