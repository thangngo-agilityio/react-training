import { HTMLInputTypeAttribute, ReactNode } from 'react'

export interface InputFiledProps {
  inputClass?: string
  labelClass?: string
  htmlFor?: string
  label?: ReactNode
  type?: HTMLInputTypeAttribute
  name?: string
  value?: string
  placeholder?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
