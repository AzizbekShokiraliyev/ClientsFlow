import type { ClientDealStatus, DealStatus } from "@/interface/Interface";

export const ClientStatusStyles: Record<ClientDealStatus, string> = {
  "New": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "In Progress": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  "Won": "bg-green-500/10 text-green-500 border-green-500/20",
  "Lost": "bg-red-500/10 text-red-500 border-red-500/20",
};

export const DealStatusStyles: Record<DealStatus, string> = {
  "Todo": "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
  "In Progress": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "Done": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
};