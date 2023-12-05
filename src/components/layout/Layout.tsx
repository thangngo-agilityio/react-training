import { ReactNode } from "react"
import Header from "@components/header/Header"

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default Layout
