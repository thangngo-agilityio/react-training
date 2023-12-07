// Library
import { ReactNode, useContext } from 'react';
// Context
import { ToastContext } from "context/toast"
// components
import Header from "@components/header/Header"
import Toast from "@components/common/toast/Toast"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  const { toast } = useContext(ToastContext)

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <Header />
          {children}
        </div>
      </div>

      <Toast message={toast.message} toastType={toast.toastType} isShow={toast.isVisible} />
    </>
  )
}

export default Layout
