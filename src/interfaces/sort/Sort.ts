import { SortOptionProps } from "./Option";

export interface SortProps {
  selectOptions: Array<SortOptionProps>
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  value?: string
}
