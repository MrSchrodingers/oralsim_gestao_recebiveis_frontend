import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, Search } from 'lucide-react'

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Skeleton className="h-8 w-48 bg-emerald-100/50 dark:bg-emerald-900/20" />
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <Skeleton className="h-10 w-full sm:w-64 bg-emerald-100/50 dark:bg-emerald-900/20" />
          </div>
          <Skeleton className="h-10 w-40 bg-emerald-100/50 dark:bg-emerald-900/20" />
        </div>
      </div>

      <Card className="border-emerald-100 dark:border-emerald-900 shadow-sm">
        <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20 rounded-t-lg pb-4">
          <CardTitle className="text-emerald-700 dark:text-emerald-400 text-lg">
            <Skeleton className="h-6 w-40 bg-emerald-200/50 dark:bg-emerald-800/30" />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Table header skeleton */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4">
                <div className="grid grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-5 w-full bg-gray-200 dark:bg-gray-700" />
                  ))}
                </div>
              </div>
              
              {/* Table rows skeleton */}
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="p-4">
                    <div className="grid grid-cols-5 gap-4">
                      {[1, 2, 3, 4, 5].map((cell) => (
                        <Skeleton 
                          key={cell} 
                          className={`h-5 ${cell === 5 ? 'w-24 ml-auto' : 'w-full'} bg-emerald-100/50 dark:bg-emerald-900/20`} 
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
