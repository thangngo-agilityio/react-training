import { SortProps } from 'types/sort/Sort';
import SortOption from './SortOption/SortOption';
import './sort.css';

const Sort = ({ selectOptions, onChange, value }: SortProps) => {
  return (
    <>
      <select className="sort-value" id="sort" onChange={onChange} value={value}>
        {selectOptions.map((option, index) => (
          <SortOption
            key={index}
            value={option.value}
            disabled={option.disabled}
            children={option.children}
          />
        ))}
      </select>
    </>
  );
};

export default Sort;
