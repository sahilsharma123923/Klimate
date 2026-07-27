import type { WeatherData } from "@/api/Type"
import { useFavourite } from "@/hooks/UseFavourite"
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";



interface favoriteButtonProps{
    data:WeatherData
}
const favoriteButton = ({data}:favoriteButtonProps) => {
    const {addToFavorites,isFavorite,removeFavorites}=useFavourite();
    const isCurrentlyFavorite=isFavorite(data.coord.lat,data.coord.lon)

    const handleToggleFavorite=()=>{
        if(isCurrentlyFavorite){
            removeFavorites.mutate(`${data.coord.lat}-${data.coord.lon}`);
            toast.error(`Removed ${data.name} from Favorites`);
        }
        else{
            addToFavorites.mutate({
              name:data.name,
              lat:data.coord.lat,
              lon:data.coord.lon,
              country:data.sys.country
            });
            toast.success(`Added ${data.name } to Favorites`);
        }
    };
  return (
    <Button
    variant={isCurrentlyFavorite ? "default":"outline"}
    size={"icon"}
    onClick={handleToggleFavorite}
    className={isCurrentlyFavorite ? "bg-yellow-500 hover:bg-amber-400":""}>
        <Star
        className={`h-4 w-4 ${isCurrentlyFavorite ? "fill-accent":""}`}/>
    </Button>
  )
}

export default favoriteButton
