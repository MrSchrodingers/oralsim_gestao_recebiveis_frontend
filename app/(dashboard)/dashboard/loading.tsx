import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      {/* Heading skeleton */}
      <Skeleton className="h-8 w-3/4 max-w-md mb-6 bg-emerald-100/50 dark:bg-emerald-900/20" />

      {/* Subscription plan card skeleton */}
      <Card className="mb-8 border-emerald-100 dark:border-emerald-900 shadow-sm">
        <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20 rounded-t-lg">
          <Skeleton className="h-6 w-48 bg-emerald-200/50 dark:bg-emerald-800/30" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <Skeleton className="h-5 w-48 mb-2 bg-emerald-100/50 dark:bg-emerald-900/20" />
                <Skeleton className="h-4 w-36 bg-emerald-100/50 dark:bg-emerald-900/20" />
              </div>
              <Skeleton className="h-10 w-40 bg-emerald-100/50 dark:bg-emerald-900/20" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export function SettingsLoading() {
  return (
    <section className="flex-1 p-4 lg:p-8">
      {/* Heading skeleton */}
      <Skeleton className="h-8 w-3/4 max-w-md mb-6 bg-emerald-100/50 dark:bg-emerald-900/20" />

      {/* Subscription plan card skeleton */}
      <Card className="mb-8 border-emerald-100 dark:border-emerald-900 shadow-sm">
        <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20 rounded-t-lg">
          <Skeleton className="h-6 w-48 bg-emerald-200/50 dark:bg-emerald-800/30" />
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <Skeleton className="h-5 w-48 mb-2 bg-emerald-100/50 dark:bg-emerald-900/20" />
                <Skeleton className="h-4 w-36 bg-emerald-100/50 dark:bg-emerald-900/20" />
              </div>
              <Skeleton className="h-10 w-40 bg-emerald-100/50 dark:bg-emerald-900/20" />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}


