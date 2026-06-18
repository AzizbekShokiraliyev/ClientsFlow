import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useAllDeals } from "@/hooks/useDeal"
import { ClientStatusStyles } from "../shared/StyleStatus"
import type { ClientDealStatus } from "@/interface/Interface"

export function RecentDeals() {
  const { data: deals } = useAllDeals()
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recently Updated Deals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-2">
        {(deals ?? []).map((deal) => (
          <div
            key={deal.id}
            className="flex items-center justify-between rounded-lg border px-4 py-3"
          >
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{deal.title}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(deal.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <span
              className={cn(
                "w-[5vw] rounded-md border px-2.5 py-1 text-center text-xs font-medium",
                ClientStatusStyles[deal.status as ClientDealStatus]
              )}
            >
              {deal.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
