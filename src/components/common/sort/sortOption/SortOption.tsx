import { SortOptionProps } from 'types/sort/Option';

const SortOption = ({ value, children, disabled }: SortOptionProps) => {
  return (
    <option className="sort-item" disabled={disabled} value={value}>
      {children}
    </option>
  );
};

export default SortOption;
