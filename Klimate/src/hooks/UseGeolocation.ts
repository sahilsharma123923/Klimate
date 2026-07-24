import type { coordinates } from "@/api/Type"
import { useEffect, useState } from "react"

interface Geolocation{
    coordinates:coordinates |null;
    error:string |null;
    isLoading:boolean;
}

 export const UseGeolocation = () => {
    const[locationData,setLocationData]=useState<Geolocation>({
        coordinates:null,
        error:null,
        isLoading:true
    });
    const getLocation=()=>{

        setLocationData((prev)=>({...prev,isLoading:true,error:null}));

        if(!navigator.geolocation){
            setLocationData({
                coordinates:null,
                error:"GeoLocation is supported by your browser",
                isLoading:false
            });
            return;
        }
        navigator.geolocation.getCurrentPosition((position)=>{
          setLocationData({
            coordinates:{
                lat:position.coords.latitude,
                lon:position.coords.longitude,
            },
            error:null,
            isLoading:false,
          })
        },(error)=>{
          let errorMessage:string;


          switch(error.code){
            case error.PERMISSION_DENIED:
                errorMessage="Location permission denied.Please try enable location access.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage="Location information is unavailable";
                break;    
            case error.TIMEOUT:
                errorMessage="Location request time out";
                break;
            default:
                errorMessage="An unknown error occurred.";  

          }
          setLocationData({
            coordinates:null,
            error:errorMessage,
            isLoading:false
          })
        },{
            enableHighAccuracy:true,
            timeout:5000,
            maximumAge:0
        })
    }

    useEffect(()=>{
       getLocation();
    },[])
  return {
    ...locationData,
    getLocation,
  };
}


