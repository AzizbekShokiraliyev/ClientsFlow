import type { ReactNode } from "react";

export type DealStatus = "Todo" | "In Progress" | "Done";
export type ClientDealStatus = "New" | "In Progress" | "Won" | "Lost";

export interface Client {
  id: string
  user_id: string
  fullName?: string
  email: string | null
  phone: string | null
  phoneNumber?: string | null
  company: string | null
  created_at: string
  updated_at: string
}

export interface Deal {
  id: string
  user_id: string
  client_id: string
  title: string
  description?: string | null
  status: DealStatus
  due_date?: string | null
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  user_id: string
  deal_id: string
  title: string
  description: string | null
  status: DealStatus
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface ClientDeal {
  id: string
  title: string
  status: ClientDealStatus
  created_at: string
}

export interface KanbanDeal {
  id: string
  title: string
  status: ClientDealStatus
  client: string
}

export interface StatCardProps {
  title: string
  value: number
  icon: ReactNode
}

export interface DealModalProps {
  deal?: Deal
}

export interface ClientModalProps {
  client?: Client
}

export interface SearchProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export interface KanbanCardProps {
  deal: KanbanDeal
}

export interface KanbanColumnProps {
  status: string
  deals: KanbanDeal[]
}