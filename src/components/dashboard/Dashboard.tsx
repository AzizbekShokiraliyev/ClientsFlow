// app/dashboard/page.tsx
import { Users, Handshake, ListTodo } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentDeals } from "@/components/dashboard/RecentDeals";

const statCardInfo = [
  { title: "Total Clients", value: 48, icon: <Users size={20} /> },
  { title: "Open Deals", value: 12, icon: <Handshake size={20} /> },
  { title: "Incomplete Tasks", value: 23, icon: <ListTodo size={20} /> },
];

export default function Dashboard() {
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
  );
}