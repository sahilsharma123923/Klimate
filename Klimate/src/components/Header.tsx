import { Link } from "react-router-dom"
import { useTheme } from "@/context/Theme-provider"

const Header = () => {
  const{theme}=useTheme();
  const isDark=theme==="dark"
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-2">
    <div className="flex items-center justify-between px-4 h-16 container mx-auto">
      <Link to={"/"}>
      <img 
      src={isDark?"/logo.png":"/logo2.png"}
      alt="Klimate"
      className="h-14"
      />
      </Link>
      <div className="flex gap-4">
        {/* citySearch */}
        {/* ToggleMode */}
      </div>
    </div>
    </header>
  )
}

export default Header
