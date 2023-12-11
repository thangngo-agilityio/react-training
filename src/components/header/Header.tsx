// Library
import { useEffect, useState } from 'react';
// Constants
import { DEFAULT_PAGINATION, FILTER_ATTRIBUTE } from "constants/filter";
// Hooks
import useProduct from "hooks/useProduct"
// Components
import Sort from "@components/common/sort/Sort"
import Spinner from "@components/common/spinner/Spinner";
import InputField from "@components/common/inputField/InputField"
import iconSearch from '../../../src/assets/icon/icon_search.svg'

const Header = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setSearchName, searchName, path, sortValue, setSortValue, getProductList } = useProduct()

  useEffect(() => {
    getProductList(DEFAULT_PAGINATION)
    setSearchName(searchName)
  }, [searchName, path])

  // useEffect(() => {
  //   setIsLoading((prev) => !prev)
  // }, [setIsLoading])

  useEffect(() => {
    setSearchName(searchName)
  }, [searchName, setSearchName])

  const handleChangeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
    await getProductList(DEFAULT_PAGINATION)
  }

  const handleChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value)
  }

  const selectOption = [
    {
      value: FILTER_ATTRIBUTE.DEFAULT,
      disabled: false,
      children: 'Default',
    },
    {
      value: FILTER_ATTRIBUTE.NAME_ASC,
      disabled: false,
      children: 'Sort names asc',
    },
    {
      value: FILTER_ATTRIBUTE.NAME_DESC,
      disabled: false,
      children: 'Sort names desc',
    },
    {
      value: FILTER_ATTRIBUTE.PRICE_ASC,
      disabled: false,
      children: 'Sort price asc',
    },
    {
      value: FILTER_ATTRIBUTE.PRICE_DESC,
      disabled: false,
      children: 'Sort price desc',
    },
  ]

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
              <InputField type="search" inputClass="input-search" htmlFor="search" placeholder="Search for food, coffe, etc.." value={searchName} onChange={handleChangeSearch} />
            </form>
          </div>
          <Sort selectOptions={selectOption} onChange={handleChangeSort} value={sortValue} />
        </nav>
      </header>
      {isLoading && (
        <Spinner />
      )}
    </>
  )
}

export default Header
