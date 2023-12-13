import { FormEvent } from 'react';
import { Button, InputField } from '@components/index';
import { Product } from 'types/product/Product';
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
          htmlFor="name"
          labelClass="form-title"
          label="Name"
          type="text"
          inputClass="form-input"
          name="name"
          value={product.name}
          onChange={onchange}
        />
        {errorProductMessage.name && (
          <p id="name-error" className="error-message">
            {errorProductMessage.name}
          </p>
        )}
      </div>
      <div className="form-item">
        <InputField
          htmlFor="price"
          labelClass="form-title"
          label="Price"
          type="number"
          inputClass="form-input"
          name="price"
          value={`${product.price}`}
          onChange={onchange}
        />
        <p id="price-error" className="error-message">
          {errorProductMessage.price}
        </p>
      </div>
      <div className="form-item">
        <InputField
          htmlFor="image"
          labelClass="form-title"
          label="Image URL"
          type="text"
          inputClass="form-input"
          name="image"
          value={product.image}
          onChange={onchange}
        />
        <p id="image-error" className="error-message">
          {errorProductMessage.image}
        </p>
      </div>
      <div className="form-item is-special">
        <InputField
          htmlFor="quantity"
          labelClass="form-title"
          label="Quantity"
          type="number"
          inputClass="form-input is-size"
          name="quantity"
          value={`${product.quantity}`}
          onChange={onchange}
        />
        <p id="quantity-error" className="error-message">
          {errorProductMessage.quantity}
        </p>
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
