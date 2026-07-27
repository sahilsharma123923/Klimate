import { useFavourite } from "@/hooks/UseFavourite"
import { ScrollArea } from "./ui/scroll-area"
import { useNavigate } from "react-router-dom";
import { useWeatherQuery } from "@/hooks/useWeather";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface FavortieCityProps{
    id:string,
    name:string,
    lat:number,
    lon:number,
    onRemove:(id:string)=>void;
}

const FavoriteCities = () => {
    const {favorites,removeFavorites,}=useFavourite();
    if(!favorites.length){
        return null;
    }
  return (
    <>
    <h1 className="text-xl text-bold tracking-tight">Favortie</h1>
  <ScrollArea className="w-full pb-5">
    <div className="flex gap-4">
     {favorites.map((city)=>{
      return(
        <FavortieCityTablet key={city.id} {...city}
        onRemove={()=>removeFavorites.mutate(city.id)} />
      )
     })}
    </div>

  </ScrollArea>
    </>
  )
};

function FavortieCityTablet({id,name,lat,lon,onRemove}:FavortieCityProps) {
    const navigate=useNavigate();
    const {data:weather,isLoading}=useWeatherQuery({lat,lon});

    return (
        <div onClick={()=>navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
        role="button"
        tabIndex={0}
        className="relative flex min-w-64 cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md">
          <Button 
          variant="ghost"
          size="icon"
          onClick={(e)=>{
            e.stopPropagation();
            onRemove(id);
            toast.error(`Removed ${name} from Favorites`);
          }}
          className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100">
            <X className="h-4 w-4"/>
          </Button>
          {isLoading?(
            <div className="flex h-8 items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin"/>
            </div>

          ):weather?(
            <>
            <div className="flex items-center justify-center">
             <img 
             src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
             alt={weather.weather[0].description}
             className="h-8 w-8"/>
             <div>
                <p className="font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">{weather.sys.country}</p>
             </div>
            </div>
            <div className="ml-auto text-right">
                <p className="text-xl font-bold">{Math.round(weather.main.temp)}°</p>
                <p className="text-xs capitalize text-muted-foreground">{weather.weather[0].description}</p>
            </div>
            </>
          ):null}
        </div>
    )
}



export default FavoriteCities
