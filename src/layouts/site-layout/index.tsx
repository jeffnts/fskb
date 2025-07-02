import React, { ReactNode } from 'react'
import Header from './header'
import Footer from './footer'

interface SiteLayoutProps {
  children: ReactNode
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1  mt-44 lg:mt-60">{children}</main>
      <Footer />
    </div>
  )
}

export default SiteLayout
