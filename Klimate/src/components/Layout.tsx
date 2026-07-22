import type { PropsWithChildren } from "react"

const Layout = ({children}:PropsWithChildren) => {

  return (
    <div className="bg-linear-to-br from-background to-muted">
      header
      <main className="min-h-screen container mx-auto px-4 py-8">
       {children}
      </main>
      <footer className="border-t backdrop:blur py-12">
        <div className="container mx-auto  text-center text-neutral-500">
            <p>Made with Sahil Sharma</p>
        </div>

      </footer>
    </div>
  )
}

export default Layout
