import type { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps): React.JSX.Element {
  return (
    <div className="flex h-screen flex-col bg-bg-deep text-text-primary">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-5">
          <div className="mx-auto flex max-w-[1400px] flex-col gap-4">{children}</div>
        </main>
      </div>
    </div>
  )
}

export default MainLayout
