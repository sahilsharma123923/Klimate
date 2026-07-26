import { useEffect, useState } from "react";

export function useLocalStorage<T>(key:string,initialvalue:T){
      const[storedValue,setStoredValue] =useState<T>(()=>{
             try{
            const item=window.localStorage.getItem(key);
            return item?JSON.parse(item):initialvalue
             }catch(err){
                console.log("Error :",err);
                return initialvalue;
             }
    });

    useEffect(() => {
       try{
            window.localStorage.setItem(key,JSON.stringify(storedValue));
             }catch(err){
                console.log("Error :",err);
             }
    },[key,storedValue])

    return [storedValue,setStoredValue] as const;
}