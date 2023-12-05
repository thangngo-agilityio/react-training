import { ReactNode, useContext } from "react"
import { ModalContext } from "context/modal"
import { ToastContext } from "context/toast"
import Header from "@components/header/Header"
import Spinner from "@components/common/spinner/Spinner"
import Toast from "@components/common/toast/Toast"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {

  const { loadingShowUp } = useContext(ModalContext)

  const { toast } = useContext(ToastContext)

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

      <Toast message={toast.message} toastType={toast.toastType} isShow={toast.isVisible} />
    </>
  )
}

export default Layout
