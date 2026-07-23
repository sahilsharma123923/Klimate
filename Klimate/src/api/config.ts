
export const API_CONFIG={
    BASE_URL:"https://api.openweathermap.org/data/4.0",
    GEO:"http://api.openweathermap.org/geo/1.0",
    API_KEY:import.meta.env.OPENWEATHER_API_KEY,
    DEFAULT_PARAMS:{
        units:"metric",
        appid:import.meta.env.OPENWEATHER_API_KEY
    },
};