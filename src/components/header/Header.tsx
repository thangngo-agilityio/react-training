import InputField from "@components/common/inputField/InputField"
import Sort from "@components/common/sort/Sort"
import iconSearch from '../../../src/assets/icon/icon_search.svg'

function Header() {
  return (
    <header className="header">
      <a className="link-title" href="/">
        <h1 className="header-title">Foods Management</h1>
      </a>
      <nav className="header-nav">
        <div className="nav-heading">
          <form className="form-search">
            <img src={iconSearch} className="icon-search" loading="eager" alt="search" />
            <InputField type="search" inputClass="input-search" htmlFor="search" placeholder="Search for food, coffe, etc.." />
          </form>
        </div>
        <Sort selectOptions={
          [
            {
              value: undefined,
              disabled: true,
              children: 'Sort by'
            },
            {
              value: 'Default',
              disabled: false,
              children: 'Default'
            },
            {
              value: 'Name',
              disabled: false,
              children: 'Name',
            },
            {
              value: 'Price',
              disabled: false,
              children: 'Price',
            },
          ]
        } />
      </nav>
    </header>
  )
}

export default Header
