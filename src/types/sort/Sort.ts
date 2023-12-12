import { SortOptionProps } from './Option';

export type SortProps = {
  selectOptions: Array<SortOptionProps>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};
