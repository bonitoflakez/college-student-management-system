import './globals.css'
import type { Metadata } from 'next'

import Navbar from '@/components/navbar/navbar'

const metadata: Metadata = {
  title: 'College Management System',
  description: '~',
}

const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export { metadata };
export default Layout;
