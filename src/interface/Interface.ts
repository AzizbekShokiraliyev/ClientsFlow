import type { LoginValues, RegisterValues } from "@/lib/validation";
import type { ReactNode } from "react";
import type { FieldError, UseFormRegister } from "react-hook-form";

export type TaskStatus = "Todo" | "In Progress" | "Done";
export type ClientDealStatus = "New" | "In Progress" | "Won" | "Lost";
export type AuthValues = LoginValues | RegisterValues

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

export interface DeleteDialogProps {
  deleteTitle: string;
  onConfirm: () => void;
  disabled: boolean
}

export interface EmailFieldProps {
  register: UseFormRegister<AuthValues>
  error?: FieldError
}

export interface PasswordFieldProps {
  register: UseFormRegister<AuthValues>
  error?: FieldError
}

export interface ColumnDef<T> {
  header: string
  className?: string
  cellClassName?: string
  render: (row: T) => React.ReactNode
}

export interface DataTableProps<T extends { id: string | number }> {
  columns: ColumnDef<T>[]
  data: T[] | undefined
  isLoading?: boolean
  isError?: boolean
  loadingText?: string
  errorText?: string
  emptyText?: string
  onRowClick?: (row: T) => void
  renderActions?: (row: T) => React.ReactNode
  actionsHeader?: string
}