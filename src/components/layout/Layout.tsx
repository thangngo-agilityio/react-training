import { ReactNode, useContext } from "react"
import Header from "@components/header/Header"
import { ModalContext } from "context/modal"
import Spinner from "@components/common/spinner/Spinner"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {

  const { loadingShowUp } = useContext(ModalContext)

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <Header />
          {children}
        </div>
      </div>
      {loadingShowUp && (
        <Spinner />
      )}
    </>
  )
}

export default Layout
