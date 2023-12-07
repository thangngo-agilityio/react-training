import { useEffect, useState } from 'react';
import { FILTER_ATTRIBUTE } from "constants/filter";
import InputField from "@components/common/inputField/InputField"
import Sort from "@components/common/sort/Sort"
import useProduct from "@components/hooks/useProduct"
import Spinner from "@components/common/spinner/Spinner";
import iconSearch from '../../../src/assets/icon/icon_search.svg'

function Header() {
  const [isLoading, setIsLoading] = useState(false)
  const { setSearchName, searchName, path, refetch, isRefetching, sortValue, setSortValue } = useProduct()


  useEffect(() => {
    console.log(path)
    refetch()
    setSearchName(searchName)
  }, [searchName, refetch, path])

  useEffect(() => {
    setIsLoading(isRefetching)
  }, [setIsLoading, isRefetching])

  useEffect(() => {
    setSearchName(searchName)
  }, [searchName, setSearchName])

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value)
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
