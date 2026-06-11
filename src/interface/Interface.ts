import type { ReactNode } from "react";
export type DealStatus = "New" | "In Progress" | "Won" | "Lost";

export interface Deal {
  id: string;
  title: string;
  status: DealStatus;
  updated_at: string;
}

export interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export interface Client {
  id: string
  user_id: string
  firstName: string
  lastName: string
  email: string | null
  phoneNumber: string | null
  company: string | null
  created_at: string
  updated_at: string
}

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}