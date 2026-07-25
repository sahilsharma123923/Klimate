import { Button } from "@base-ui/react"
import { CommandDialog, CommandEmpty, CommandGroup, CommandItem, CommandList } from "./ui/command"
import { CommandInput } from "cmdk"
import { useState } from "react"
import { Search } from "lucide-react"

const CitySearch = () => {

    const[open,setOpen]=useState(false);
    const[query,setQuery]=useState("");
  return (
    <div>
      <Button onClick={()=>setOpen(true)}>
        <Search className="mr-2 h-4 w-4"/>
        Search cities...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..."/>
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
            </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  )
}

export default CitySearch
