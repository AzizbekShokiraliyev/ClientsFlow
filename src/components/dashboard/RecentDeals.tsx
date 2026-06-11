// components/dashboard/RecentDeals.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deal, DealStatus } from "@/interface/Interface";
import { cn } from "@/lib/utils";

const mockDeals: Deal[] = [
  { id: "1", title: "Acme Corp - Enterprise Plan", status: "In Progress", updated_at: "2026-06-11T10:00:00Z" },
  { id: "2", title: "TechFlow - Starter Package", status: "New", updated_at: "2026-06-11T08:30:00Z" },
  { id: "3", title: "Globex - Pro Subscription", status: "Won", updated_at: "2026-06-10T15:00:00Z" },
  { id: "4", title: "Initech - Custom Integration", status: "Lost", updated_at: "2026-06-09T12:00:00Z" },
  { id: "5", title: "Umbrella - Team License", status: "New", updated_at: "2026-06-08T09:00:00Z" },
  { id: "4", title: "Initech - Custom Integration", status: "Lost", updated_at: "2026-06-09T12:00:00Z" },
];

const statusStyles: Record<DealStatus, string> = {
  "New": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "In Progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Won": "bg-green-500/10 text-green-400 border-green-500/20",
  "Lost": "bg-red-500/10 text-red-400 border-red-500/20",
};

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
                {new Date(deal.updated_at).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })}
              </p>
            </div>
            <span className={cn("text-xs font-medium px-2.5 py-1 rounded-md border w-[5vw] text-center", statusStyles[deal.status])}>
              {deal.status}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}