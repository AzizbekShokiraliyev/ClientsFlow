import { Users, Handshake, ListTodo } from "lucide-react"
import { StatCard } from "@/components/dashboard/StatCard"
import { RecentDeals } from "@/components/dashboard/RecentDeals"
import { useClient } from "@/hooks/useClient"
import { AllTask } from "@/hooks/useTask"
import { useAllDeals } from "@/hooks/useDeal"

export default function Dashboard() {
  const { data: clients } = useClient()
  const { data: deals } = useAllDeals()
  const { data: tasks } = AllTask()

  const statCardInfo = [
    {
      title: "Total Clients",
      value: clients?.length ?? 0,
      icon: <Users size={20} />,
    },
    {
      title: "Open Deals",
      value: deals?.length ?? 0,
      icon: <Handshake size={20} />,
    },
    {
      title: "Incomplete Tasks",
      value: tasks?.filter((t) => t.status !== "Done").length ?? 0,
      icon: <ListTodo size={20} />,
    },
  ]
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statCardInfo.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
      <RecentDeals />
    </div>
  )
}
