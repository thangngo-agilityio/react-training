import { FormEvent } from 'react';
import { Button, InputField } from '@components/index';
import { Product } from 'types';
import { ProductErrorMessage, defaultErrorMessage } from 'constants/product';

type ProductModalProps = {
  product: Product;
  errorProductMessage?: ProductErrorMessage;
  onCancelClick?: () => void;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
};

const ProductModal = ({
  product,
  errorProductMessage = defaultErrorMessage,
  onCancelClick,
  onchange,
  onSubmit
}: ProductModalProps) => {
  return (
    <form className="modal-form" onSubmit={onSubmit}>
      <div className="form-item">
        <InputField
          labelClass="form-title"
          label="Name"
          type="text"
          inputClass="form-input"
          name="name"
          value={product.name}
          onChange={onchange}
          errorMessage={errorProductMessage.name}
        />
      </div>
      <div className="form-item">
        <InputField
          labelClass="form-title"
          label="Price"
          type="number"
          inputClass="form-input"
          name="price"
          value={`${product.price}`}
          onChange={onchange}
          errorMessage={errorProductMessage.price}
        />
      </div>
      <div className="form-item">
        <InputField
          labelClass="form-title"
          label="Image URL"
          type="text"
          inputClass="form-input"
          name="image"
          value={product.image}
          onChange={onchange}
          errorMessage={errorProductMessage.image}
        />
      </div>
      <div className="form-item is-special">
        <InputField
          labelClass="form-title"
          label="Quantity"
          type="number"
          inputClass="form-input is-size"
          name="quantity"
          value={`${product.quantity}`}
          onChange={onchange}
          errorMessage={errorProductMessage.quantity}
        />
      </div>
      <div className="form-btn">
        <Button
          children="Cancel"
          type="button"
          classButton="btn btn-cancel"
          onClick={onCancelClick}
        />
        <Button type="submit" children="Save" classButton="btn btn-cancel" />
      </div>
    </form>
  );
};

export default ProductModal;
