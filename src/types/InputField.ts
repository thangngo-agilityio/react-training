import { HTMLInputTypeAttribute, ReactNode } from 'react';

export type InputFiledProps = {
  inputClass?: string;
  labelClass?: string;
  htmlFor?: string;
  label?: ReactNode;
  type?: HTMLInputTypeAttribute;
  name?: string;
  value?: string;
  placeholder?: string;
  errorMessage?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
