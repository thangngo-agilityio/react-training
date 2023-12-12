import { Meta, StoryObj } from '@storybook/react';
import ProductModal from './ProductModal';
import InputField from '@components/common/InputField/InputField';

const meta: Meta<typeof ProductModal> = {
  title: 'COMPONENTS/ProductModal',
  component: ProductModal
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ModalAdd: Story = {
  render: (args) => (
    <ProductModal
      {...args}
      title="Create new product"
      textBtn="Save"
      children={
        <>
          <div className="form-item">
            <InputField
              htmlFor="name"
              labelClass="form-title"
              label="Name"
              type="text"
              inputClass="form-input"
              name="name"
            />
          </div>
          <div className="form-item">
            <InputField
              htmlFor="price"
              labelClass="form-title"
              label="Price"
              type="number"
              inputClass="form-input"
              name="price"
            />
          </div>
          <div className="form-item">
            <InputField
              htmlFor="image"
              labelClass="form-title"
              label="Image URL"
              type="text"
              inputClass="form-input"
              name="image"
            />
          </div>
          <div className="form-item is-special">
            <InputField
              htmlFor="quantity"
              labelClass="form-title"
              label="Quantity"
              type="number"
              inputClass="form-input is-size"
              name="quantity"
            />
          </div>
        </>
      }
    />
  )
};

export const ModalEdit: Story = {
  render: (args) => (
    <ProductModal
      {...args}
      title="Edit"
      textBtn="Save"
      children={
        <>
          <div className="form-item">
            <InputField
              htmlFor="name"
              labelClass="form-title"
              label="Name"
              type="text"
              inputClass="form-input"
              name="name"
            />
          </div>
          <div className="form-item">
            <InputField
              htmlFor="price"
              labelClass="form-title"
              label="Price"
              type="number"
              inputClass="form-input"
              name="price"
            />
          </div>
          <div className="form-item">
            <InputField
              htmlFor="image"
              labelClass="form-title"
              label="Image URL"
              type="text"
              inputClass="form-input"
              name="image"
            />
          </div>
          <div className="form-item is-special">
            <InputField
              htmlFor="quantity"
              labelClass="form-title"
              label="Quantity"
              type="number"
              inputClass="form-input is-size"
              name="quantity"
            />
          </div>
        </>
      }
    />
  )
};

export const ModalConfirm: Story = {
  render: (args) => (
    <ProductModal
      {...args}
      classTitle="confirm-title"
      title="Are you sure you want to delete this food?"
      textBtn="Save"
    />
  )
};
