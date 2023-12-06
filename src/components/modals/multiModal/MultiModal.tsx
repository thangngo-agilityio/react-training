import { FormEvent, memo, useCallback } from "react"
import Button from "@components/common/button/Button"
import InputField from "@components/common/inputField/InputField"
import { Product } from "interfaces/product/Product"
import { ProductErrorMessage, defaultData, defaultErrorMessage } from "constants/product"

interface MultiModalProps {
  title: string
  productData?: Product
  errorProductMessage?: ProductErrorMessage
  onCancelClick: () => void
  setProductData: (food: Product) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

function MultiModal({ title, productData = defaultData, errorProductMessage = defaultErrorMessage, onCancelClick, setProductData, onSubmit }: MultiModalProps) {
  const onChangeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setProductData({
      ...productData,
      [e.target.name]: value
    })
  }, [productData, setProductData])

  return (
    <div className="modal-overlay">
      <div className="manage-modal">
        <h2 className="modal-title">
          {title}
        </h2>
        <form className="modal-form" onSubmit={onSubmit}>
          <div className="form-item">
            <InputField htmlFor="name" labelClass="form-title" label="Name" type="text" inputClass="form-input" name="name" value={productData.name} onChange={onChangeInput} />
            {errorProductMessage.name && (
              <p id="name-error" className="error-message">{errorProductMessage.name}</p>
            )}
          </div>
          <div className="form-item">
            <InputField htmlFor="price" labelClass="form-title" label="Price" type="number" inputClass="form-input" name="price" value={`${productData.price}`} onChange={onChangeInput} />
            <p id="price-error" className="error-message">{errorProductMessage.price}</p>
          </div>
          <div className="form-item">
            <InputField htmlFor="image" labelClass="form-title" label="Image URL" type="text" inputClass="form-input" name="image" value={productData.image} onChange={onChangeInput} />
            <p id="image-error" className="error-message">{errorProductMessage.image}</p>
          </div>
          <div className="form-item is-special">
            <InputField htmlFor="quantity" labelClass="form-title" label="Quantity" type="number" inputClass="form-input is-size" name="quantity" value={`${productData.quantity}`} onChange={onChangeInput} />
            <p id="quantity-error" className="error-message">{errorProductMessage.quantity}</p>
          </div>
          <div className="form-btn">
            <Button children="Cancel" classButton="btn btn-cancel" onClick={onCancelClick} />
            <Button type="submit" children="Save" classButton="btn btn-cancel" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(MultiModal)
