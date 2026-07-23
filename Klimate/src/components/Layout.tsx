import type { PropsWithChildren } from "react"
import Header from "./Header"

const Layout = ({children}:PropsWithChildren) => {

  return (
    <div className="bg-linear-to-br from-background to-muted">
     <Header/>
      <main className="min-h-screen container mx-auto px-4 py-8">
       {children}
      </main>
      <footer className="border-t backdrop:blur py-12 supports-backdrop-filter:bg-background/50">
        <div className="container mx-auto  text-center text-neutral-500 ">
            <p>Made with Sahil Sharma</p>
        </div>

      </footer>
    </div>
  )
}

export default Layout
