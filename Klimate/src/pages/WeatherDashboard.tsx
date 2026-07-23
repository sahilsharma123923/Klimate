import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

const WeatherDashboard = () => {
  return (
    <div className="space-y-4">
      {/* Favourite City */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button 
        variant={"outline"}
         size={"icon"}
        //  onClick={handleRefresh}
        // disabled={}
        >
          <RefreshCw className="w-5 h-5"/></Button>
      </div>


    </div>
  )
}

export default WeatherDashboard
