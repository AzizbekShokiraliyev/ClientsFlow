import type { ReactNode } from "react";

export type TaskStatus = "Todo" | "In Progress" | "Done";
export type ClientDealStatus = "New" | "In Progress" | "Won" | "Lost";

export interface Client {
  id: string
  user_id: string
  name: string
  email: string | null
  phone: string | null
  company: string | null
  created_at: string
  updated_at: string
}

export interface ClientsTableProps {
  data: Client[]; 
}

export interface Deal {
  id: string
  user_id: string
  client_id?: string
  title: string
  status: ClientDealStatus
  created_at: string
  updated_at: string
}

export interface DealTableProps {
  deal: Deal[]
}

export interface Task {
  id: string
  user_id: string
  deal_id: string
  title: string
  description: string | null
  status: TaskStatus
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface TaskModalProps {
  task?: Task
}

export interface DealClientModalProps {
  deal?: Deal
}

export interface ClientModalProps {
  client?: Client
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

export interface ExportCsvButtonProps {
  data: Record<string, unknown>[]
  filename?: string
  headers: string[]
  keys: string[]
}