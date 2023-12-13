import { ReactNode } from 'react';

import './product-modal.css';

type ModalProps = {
  title: string;
  children?: ReactNode;
  classTitle?: string;
  dataId?: string;
};

const Modal = ({ title, children, classTitle, dataId }: ModalProps) => {
  return (
    <div className="modal-overlay">
      <div className="manage-modal">
        <input type="number" hidden defaultValue={dataId} />
        <h2 className={`modal-title ${classTitle}`}>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
