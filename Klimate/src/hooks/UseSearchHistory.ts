import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./UseLocalStorage";

interface SearchHistoryItem{
    id:string,
    query:string,
    lat:number,
    lon:number,
    name:string,
    country:string,
    state?:string,
    SearchAt:number
}


export function useSearchHistory(){
      const[history,setHistory]= useLocalStorage<SearchHistoryItem []>("search-History",[]);

      const queryClient=useQueryClient();

    const historyQuery=  useQuery({
        queryKey:["search-History"],
        queryFn:()=>history,
        initialData:history
      });

     const addToHistory= useMutation({
      mutationFn:async(search:Omit<SearchHistoryItem,"id"|"SearchAt">)=>{

       const newSearch:SearchHistoryItem={
        ...search,
        id:`${search.lat} ${search.lon} ${Date.now()}`,
        SearchAt:Date.now()
       }
       const filteredHistory=history.filter((item)=>!(item.lat===search.lat && item.lon===search.lon));

       const newHistory=[newSearch,...filteredHistory].slice(0,10)

       setHistory(newHistory)
       return newHistory
      },
      onSuccess:(newHistory)=>{
        queryClient.setQueryData(["search-History"],newHistory)
      }
      });

   const clearHistory=useMutation({
    mutationFn:async()=>{
      setHistory([]);
      return [];
    },
    onSuccess:()=>{
      queryClient.setQueryData(["search-History"],[])
    }
   })
      return{
        history:historyQuery.data??[],
        addToHistory,
        clearHistory,
      }
}