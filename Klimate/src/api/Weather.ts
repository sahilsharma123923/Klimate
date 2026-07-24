import { API_CONFIG } from "./config"
import type { coordinates, ForecastData, GeocodingResponse, WeatherData } from "./Type";

class WeatherAPI{
    // create Data
   private createUrl(endpoint:string,params:Record<string,string|number>){

    const searchParams=new URLSearchParams({
      appid:API_CONFIG.API_KEY,
      ...params,
    })

    return `${endpoint}?${searchParams.toString()}`;
   }

//    Fetch Data
   private  async fetchData<T>(url:string):Promise<T>{

    const response=await fetch(url);

    if(!response.ok){
        throw new Error(`Weather Error : ${response.statusText}`)
    }
    return response.json();
   }

//    To get Data
   async getCurrentWeather({lat,lon}:coordinates):Promise<WeatherData>{
      const url=this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
         lat:lat.toString(),
         lon:lon.toString(),
         units:API_CONFIG.DEFAULT_PARAMS.units,
      });

      return this.fetchData<WeatherData>(url);
   }

   // get Forecast
   async getForecast({lat,lon}:coordinates):Promise<ForecastData>{
      const url=this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
         lat:lat.toString(),
         lon:lon.toString(),
         units:API_CONFIG.DEFAULT_PARAMS.units,
      });

      return this.fetchData<ForecastData>(url);
   }

   // reverseGeocode
   async reverseGeoCode({ lat, lon }: coordinates): Promise<GeocodingResponse[]> {
  const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
    lat: lat.toString(),
    lon: lon.toString(),
    limit: 1,
  });

  return this.fetchData<GeocodingResponse[]>(url);
} 
}

export const weatherAPI=new WeatherAPI();