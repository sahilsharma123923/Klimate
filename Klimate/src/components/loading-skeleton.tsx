import { Skeleton } from "./ui/skeleton"

  export const WeatherSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <Skeleton className="h-75 w-full rounded-lg"/>
        <Skeleton className="h-75 w-full rounded-lg"/>
        <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-75 w-full rounded-lg"/>
            <Skeleton className="h-75 w-full rounded-lg"/>
        </div>
      </div>
    </div>
  )
}

