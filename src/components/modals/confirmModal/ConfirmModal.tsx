import Button from "@components/common/button/Button"

function ConfirmModal() {
  return(
    <div className="modal-confirm">
      <h2 className="confirm-title">Are you sure you want to delete this food?</h2>
      <div className="confirm-btn">
        <Button classButton="btn-cancel" idButton="btn-cancel" children="Cancel"/>
        <Button children="Yes"/>
      </div>
    </div>
  )
}

export default ConfirmModal
