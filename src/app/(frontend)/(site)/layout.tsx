import React, { Suspense } from 'react'
import SiteLayoutWrapper from '@/layouts/site-layout'

interface LayoutProps {
  children: React.ReactNode
}

const SiteLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SiteLayoutWrapper>
      <Suspense>{children}</Suspense>
    </SiteLayoutWrapper>
  )
}

export default SiteLayout
