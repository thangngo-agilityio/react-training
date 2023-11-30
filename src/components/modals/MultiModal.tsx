import InputField from "@components/common/inputField/InputField"

interface MultiModalProps {
  title: string
}

function MultiModal({ title }: MultiModalProps) {
  return (
    <div className="modal-overlay">
      <div className="manage-modal">
        <h2 className="modal-title">
          {title}
        </h2>
        <form className="modal-form">
          <div className="form-item">
            <InputField htmlFor="name" labelClass="form-title" label="Name" type="text" inputClass="form-input" name="name" />
            <p id="name-error" className="error-message"></p>
          </div>
          <div className="form-item">
            <InputField htmlFor="Price" labelClass="form-title" label="Price" type="text" inputClass="form-input" name="Price" />
            <p id="price-error" className="error-message"></p>
          </div>
          <div className="form-item">
            <InputField htmlFor="image" labelClass="form-title" label="Image URL" type="text" inputClass="form-input" name="image" />
            <p id="image-error" className="error-message"></p>
          </div>
          <div className="form-item is-special">
            <InputField htmlFor="quantity" labelClass="form-title" label="Quantity" type="text" inputClass="form-input" name="quantity" />
            <p id="quantity-error" className="error-message"></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MultiModal
