import type { coordinates } from "@/api/Type";
import { weatherAPI } from "@/api/Weather";
import { useQuery } from "@tanstack/react-query";


export const WEATHER_KEYS={
    weather:(coord:coordinates)=>["weather",coord] as const,
    forecast:(coord:coordinates)=>["forecast",coord] as const,
    location:(coord:coordinates)=>["location",coord] as const,
    search:(query:string)=>["location-search",query] as const
} as const;

export const useWeatherQuery=(coordinates:coordinates |null)=>{
  return useQuery({
    queryKey:WEATHER_KEYS.weather(coordinates ?? {lat:0,lon:0}),
    queryFn:()=>
        coordinates?weatherAPI.getCurrentWeather(coordinates) :null,
    enabled:!!coordinates
  })
}
export const useForecastQuery=(coordinates:coordinates |null)=>{
 return useQuery({
    queryKey:WEATHER_KEYS.forecast(coordinates ?? {lat:0,lon:0}),
    queryFn:()=>
        coordinates?weatherAPI.getForecast(coordinates) :null,
    enabled:!!coordinates
  })
}
export const useReverseGeocodeQuery=(coordinates:coordinates |null)=>{
 return useQuery({
    queryKey:WEATHER_KEYS.location(coordinates ?? {lat:0,lon:0}),
    queryFn:()=>
        coordinates?weatherAPI.reverseGeoCode(coordinates) :null,
    enabled:!!coordinates
  })
}
export function useLocationSearch(query:string){
  return useQuery({
    queryKey:WEATHER_KEYS.search(query),
    queryFn:()=>
     weatherAPI.searchLocations(query),
      enabled:query.length>=3,
    
  })
}
