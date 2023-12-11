import { SortProps } from "interfaces/sort/Sort"
import SortOption from "./sortOption/SortOption"

const Sort = ({ selectOptions, onChange, value }: SortProps) => {
  return (
    <>
      <select className="sort-value" id="sort" onChange={onChange} value={value}>
        {selectOptions.map((option, index) => (
          <SortOption key={index} value={option.value} disabled={option.disabled} children={option.children} />
        ))}
      </select>
    </>
  )
}

export default Sort
