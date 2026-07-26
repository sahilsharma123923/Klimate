import { Link } from "react-router-dom"
import { useTheme } from "@/context/Theme-provider"
import { Moon, Sun } from "lucide-react";
import CitySearch from "./CitySearch";
const Header = () => {
  const{theme,setTheme}=useTheme();
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
        <CitySearch/>
       <div onClick={()=>setTheme(isDark?"light":"dark")}
        className={`flex items-center rotate-0  cursor-pointer duration-500 transition-transform ${isDark?"rotate-180":"rotate-0"}`}>
          {isDark?(<Sun className="w-5 h-5 rotate-0 text-yellow-500 transition-all"/>):(<Moon className="w-5 h-5 rotate-0 text-blue-500 transition-all"/>)}
       </div>
      </div>
    </div>
    </header>
  )
}

export default Header
