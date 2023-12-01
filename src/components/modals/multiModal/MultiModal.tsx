import { FormEvent, memo, useCallback } from "react"
import Button from "@components/common/button/Button"
import InputField from "@components/common/inputField/InputField"
import { Food } from "interfaces/product/Product"
import { defaultData } from "constants/food"

interface MultiModalProps {
  title: string
  productData?: Food
  setProductData: (food: Food) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

function MultiModal({ title, productData = defaultData, setProductData, onSubmit }: MultiModalProps) {
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
            <p id="name-error" className="error-message"></p>
          </div>
          <div className="form-item">
            <InputField htmlFor="Price" labelClass="form-title" label="Price" type="text" inputClass="form-input" name="Price" value={`${productData.price}`} onChange={onChangeInput} />
            <p id="price-error" className="error-message"></p>
          </div>
          <div className="form-item">
            <InputField htmlFor="image" labelClass="form-title" label="Image URL" type="text" inputClass="form-input" name="image" value={productData.image} onChange={onChangeInput} />
            <p id="image-error" className="error-message"></p>
          </div>
          <div className="form-item is-special">
            <InputField htmlFor="quantity" labelClass="form-title" label="Quantity" type="text" inputClass="form-input" name="quantity" value={`${productData.quantity}`} onChange={onChangeInput} />
            <p id="quantity-error" className="error-message"></p>
          </div>
          <div className="form-btn">
            <Button children="Cancel" classButton="btn btn-cancel" />
            <Button children="Save" classButton="btn btn-cancel" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(MultiModal)
