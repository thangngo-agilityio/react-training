import { memo } from "react";


interface AddCardProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function AddCard({ onClick }: AddCardProps) {
  return (
    <div className="manage-card" onClick={onClick}>
      <div className="card-wrapper">
        <p className="manage-title">Add new dish</p>
      </div>
    </div>
  )
}

export default memo(AddCard)
