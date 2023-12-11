import { InputFiledProps } from "interfaces/input/InputField"

const InputField = ({ htmlFor, labelClass, label, inputClass, name, value, placeholder, type, onChange }: InputFiledProps) => {
  return (
    <>
      <label htmlFor={htmlFor} className={labelClass}>
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        className={inputClass}
        id={htmlFor}
        name={name}
        value={value}
        placeholder={placeholder}
      />
    </>
  )
}

export default InputField

