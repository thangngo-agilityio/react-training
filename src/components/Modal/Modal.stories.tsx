import { Meta, StoryObj } from '@storybook/react';
import { Button, ProductModal } from '..';
import { defaultData } from 'constants/product';
import Modal from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'COMPONENTS/ProductModal',
  component: Modal
};

export default meta;

type Story = StoryObj<typeof meta>;

export const ModalAdd: Story = {
  render: (args) => (
    <Modal
      {...args}
      title="Create new product"
      children={<ProductModal {...args} product={defaultData} />}
    />
  )
};

export const ModalEdit: Story = {
  render: (args) => (
    <Modal {...args} title="Edit" children={<ProductModal product={defaultData} />} />
  )
};

export const ModalConfirm: Story = {
  render: (args) => (
    <Modal
      {...args}
      classTitle="confirm-title"
      title="Are you sure you want to delete this food?"
      children={
        <div className="form-btn">
          <Button children="Cancel" type="button" classButton="btn btn-cancel" />
          <Button type="button" children="Confirm" classButton="btn btn-cancel" />
        </div>
      }
    />
  )
};
