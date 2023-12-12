// Constants
import { FILTER_ATTRIBUTE } from 'constants/filter';

// Components
import { InputField, Sort } from '..';

// icon image
import iconSearch from '../../../src/assets/icon/icon_search.svg';
// Css
import './header.css';

type HeaderProps = {
  searchValue: string;
  sortValue: string;
  handleChangeSort: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Header = ({ searchValue, sortValue, handleChangeSort, handleChangeSearch }: HeaderProps) => {
  const selectOption = [
    {
      value: FILTER_ATTRIBUTE.DEFAULT,
      disabled: false,
      children: 'Default'
    },
    {
      value: FILTER_ATTRIBUTE.NAME_ASC,
      disabled: false,
      children: 'Name asc'
    },
    {
      value: FILTER_ATTRIBUTE.NAME_DESC,
      disabled: false,
      children: 'Name desc'
    },
    {
      value: FILTER_ATTRIBUTE.PRICE_ASC,
      disabled: false,
      children: 'Price asc'
    },
    {
      value: FILTER_ATTRIBUTE.PRICE_DESC,
      disabled: false,
      children: 'Price desc'
    }
  ];

  return (
    <>
      <header className="header">
        <a className="link-title" href="/">
          <h1 className="header-title">Foods Management</h1>
        </a>
        <nav className="header-nav">
          <div className="nav-heading">
            <form className="form-search">
              <img src={iconSearch} className="icon-search" loading="eager" alt="search" />
              <InputField
                type="search"
                inputClass="input-search"
                htmlFor="search"
                placeholder="Search for food, coffe, etc.."
                value={searchValue}
                onChange={handleChangeSearch}
              />
            </form>
          </div>
          <Sort selectOptions={selectOption} onChange={handleChangeSort} value={sortValue} />
        </nav>
      </header>
    </>
  );
};

export default Header;
