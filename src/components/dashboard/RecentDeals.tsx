// components/dashboard/RecentDeals.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ClientDeal } from "@/interface/Interface";
import { cn } from "@/lib/utils";
import { ClientStatusStyles } from "../shared/StyleStatus";

const mockDeals: ClientDeal[] = [
  { id: "1", title: "Acme Corp - Enterprise Plan", status: "In Progress", created_at: "2026-06-11T10:00:00Z" },
  { id: "2", title: "TechFlow - Starter Package", status: "New", created_at: "2026-06-11T08:30:00Z" },
  { id: "3", title: "Globex - Pro Subscription", status: "Won", created_at: "2026-06-10T15:00:00Z" },
  { id: "4", title: "Initech - Custom Integration", status: "Lost", created_at: "2026-06-09T12:00:00Z" },
  { id: "5", title: "Umbrella - Team License", status: "New", created_at: "2026-06-08T09:00:00Z" },
  { id: "4", title: "Initech - Custom Integration", status: "Lost", created_at: "2026-06-09T12:00:00Z" },
];



export function RecentDeals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Recently Updated Deals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {mockDeals.map((deal) => (
          <div key={deal.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
            <div className="space-y-0.5">
              <p className="text-sm font-medium">{deal.title}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(deal.created_at).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </p>
            </div>
            <span className={cn("text-xs font-medium px-2.5 py-1 rounded-md border w-[5vw] text-center", ClientStatusStyles[deal.status])}>
              {deal.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}