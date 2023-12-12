import { FormEvent, ReactNode } from 'react';
import { Button } from '..';
import './product-modal.css';

type ProductModalProps = {
  title: string;
  children?: ReactNode;
  classTitle?: string;
  textBtn?: string;
  dataId?: string;
  onCancelClick: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const ProductModal = ({
  title,
  children,
  classTitle,
  textBtn,
  dataId,
  onCancelClick,
  onSubmit
}: ProductModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="manage-modal">
        <input type="number" hidden defaultValue={dataId} />
        <h2 className={`modal-title ${classTitle}`}>{title}</h2>
        <form className="modal-form" onSubmit={onSubmit}>
          {children}
          <div className="form-btn">
            <Button
              children="Cancel"
              type="button"
              classButton="btn btn-cancel"
              onClick={onCancelClick}
            />
            <Button type="submit" children={textBtn} classButton="btn btn-cancel" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
