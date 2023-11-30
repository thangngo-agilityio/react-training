import Sort from "@components/common/sort/Sort"

function Header() {
  return (
    <header className="header">
      <div className="header-wrapper">
        <a className="link-title" href="/">
          <h1 className="header-title">Foods Management</h1>
        </a>
        <nav className="header-nav">
          <div className="nav-heading">
            <form className="search-form">
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
      </div>
    </header>
  )
}

export default Header
