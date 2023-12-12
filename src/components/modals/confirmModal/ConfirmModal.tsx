import { FormEvent } from "react"
import Button from "@components/common/button/Button"

interface ConfirmModalProps {
  dataId: string
  onCancelClick: () => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

const ConfirmModal = ({ dataId, onCancelClick, onSubmit }: ConfirmModalProps) => {
  return (
    <div className="modal-del">
      <form onSubmit={onSubmit}>
        <div className="modal-confirm">
          <input type="number" hidden defaultValue={dataId} />
          <h2 className="confirm-title">Are you sure you want to delete this food?</h2>
          <div className="confirm-btn">
            <Button classButton="btn btn-cancel" type="button" idButton="btn-cancel" children="Cancel" onClick={onCancelClick} />
            <Button type="submit" classButton="btn" children="Yes" />
          </div>
        </div>
      </form>
    </div>
  )
}

export default ConfirmModal
