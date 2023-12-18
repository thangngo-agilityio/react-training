import { InputFiledProps } from 'types';
import './input-field.css';

const InputField = ({
  name,
  type,
  label,
  value,
  labelClass,
  inputClass,
  placeholder,
  errorMessage,
  onChange
}: InputFiledProps) => {
  return (
    <>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        className={inputClass}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      {errorMessage && (
        <p id="name-error" className="error-message">
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default InputField;
