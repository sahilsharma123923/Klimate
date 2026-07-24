import { WeatherSkeleton } from "@/components/loading-skeleton";
import { Alert,AlertTitle,AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { UseGeolocation } from "@/hooks/UseGeolocation"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/useWeather";
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import CurrentWeather from "@/components/CurrentWeather";

const WeatherDashboard = () => {
  const{
    coordinates,
    error:locationError,
    getLocation,
    isLoading:locationLoading,
  } =UseGeolocation();


  const locationQuery=useReverseGeocodeQuery(coordinates);
  const weatherQuery=useWeatherQuery(coordinates);
  const forecastQuery=useForecastQuery(coordinates);

  

  const handleRefresh=()=>{
    if(coordinates){
    locationQuery.refetch();
    weatherQuery.refetch();
    forecastQuery.refetch();
    }else{
      getLocation();
    }
  };

  if(locationLoading){
    return <WeatherSkeleton/>
  }

  if(locationError){
   return ( <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4"/>
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-1">
       <p>{locationError}</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-1 h-4 w-4"/>
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    );
  }

  if(!coordinates){
    return( <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4"/>
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
       <p>Please enable location access to see your local Weather.</p>
        <Button onClick={getLocation} variant={"outline"} className="w-fit">
          <MapPin className="mr-1 h-4 w-4"/>
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    );
  }

  const locationName=locationQuery.data?.[0];

  if(weatherQuery.error || forecastQuery.error){
    return ( <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4"/>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-1">
       <p>Failed to fetch weather data.Please try again</p>
        <Button onClick={handleRefresh} variant={"outline"} className="w-fit">
          <RefreshCw className="mr-1 h-4 w-4"/>
           retry
        </Button>
      </AlertDescription>
    </Alert>
    );
  }
  if(!weatherQuery.data || !forecastQuery.data){
    return <WeatherSkeleton/>
  }
  return (
    <div className="space-y-4">
      {/* Favourite City */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button 
        variant={"outline"}
         size={"icon"}
         onClick={handleRefresh}
        disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`w-4 h-4 ${weatherQuery.isFetching ? "animate-spin":""}`}/></Button>
        </div>

       <div>
         <div>
            <CurrentWeather 
            data={weatherQuery.data}
            locationName={locationName}/>
          
         </div>
         <div>

         </div>
       </div>
       


    </div>
  )
}

export default WeatherDashboard
