import { ReactNode } from 'react';
import './button.css';

// Set type
type ButtonProps = {
  children: ReactNode;
  classButton: string;
  type: 'submit' | 'button';
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, classButton, type, isDisabled = false, onClick }: ButtonProps) => {
  return (
    <button type={type} onClick={onClick} className={classButton} disabled={isDisabled}>
      {children}
    </button>
  );
};

export default Button;
