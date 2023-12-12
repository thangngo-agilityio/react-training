import './add-card.css';

type AddCardProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const AddCard = ({ onClick }: AddCardProps) => {
  return (
    <>
      <div className="manage-card" onClick={onClick}>
        <div className="card-wrapper">
          <p className="manage-title">Add new dish</p>
        </div>
      </div>
    </>
  );
};

export default AddCard;
