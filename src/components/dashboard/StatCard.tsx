import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { StatCardProps } from "@/interface/Interface"

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between pb-2">
          <CardTitle>
            <div className="text-sm font-medium text-muted-foreground">
              {title}
            </div>
          </CardTitle>
          <div className="text-muted-foreground">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="px-4 text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
