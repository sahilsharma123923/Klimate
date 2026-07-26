import { CommandDialog, CommandEmpty, CommandGroup, CommandItem, CommandList ,CommandInput, CommandSeparator} from "./ui/command";
import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useLocationSearch } from "@/hooks/useWeather";

const CitySearch = () => {

    const[open,setOpen]=useState(false);
    const[query,setQuery]=useState("");

    const {data:location,isLoading} =  useLocationSearch(query);
  return (
    <div>
     
     <Button variant="outline"
     className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
     onClick={()=>setOpen(true)}
     >
      <Search className="mr-2 h-4 w-4"/>
      Search cities...
     </Button>
    

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search cities..."
        value={query}
        onValueChange={setQuery}
        />
        <CommandList>
            {query.length>2 && !isLoading && (<CommandEmpty>No cities found.</CommandEmpty>)}
            <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
              </CommandGroup>
              
          <CommandSeparator/>  

            <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
             </CommandGroup>

            <CommandSeparator/> 

            <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export default CitySearch
