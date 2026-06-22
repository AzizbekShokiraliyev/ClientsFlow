import type { Deal } from "@/interface/Interface"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useAllDeals = () => {
  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },
  })
}

export const useDealById = (clientId?: string) => {
  return useQuery({
    queryKey: ["deals", clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!clientId,
  })
}

export const useDealCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      newDeal: Omit<Deal, "id" | "updated_at" | "created_at">
    ) => {
      const { data, error } = await supabase
        .from("deals")
        .insert(newDeal)
        .select()
        .single()

      if (error) throw error
      return data
    },
    //ro'yhatni yangilash 
    onSuccess: (created) => {
      queryClient.setQueryData<Deal[]>(["deals"], (old) =>
        old ? [created, ...old] : [created]
      )
      // shaxsiy profile qutichasini yangilash 
      queryClient.setQueryData<Deal[]>(
        ["deals", created.client_id],
        (old) => (old ? [created, ...old] : [created])
      )
    },
  })
}

export const useDealUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Deal> & { id: string }) => {
      const { data, error } = await supabase
        .from("deals")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Deal[]>(["deals"], (old) =>
        old?.map((d) => (d.id === updated.id ? updated : d)) ?? old
      )
      queryClient.setQueryData<Deal[]>(
        ["deals", updated.client_id],
        (old) => old?.map((d) => (d.id === updated.id ? updated : d)) ?? old
      )
    },
  })
}

export const useDealDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: existing, error: fetchError } = await supabase
        .from("deals")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError
      const { error } = await supabase.from("deals").delete().eq("id", id)
      if (error) throw error

      return existing as Deal
    },
    onSuccess: (deleted) => {
      queryClient.setQueryData<Deal[]>(["deals"], (old) =>
        old?.filter((d) => d.id !== deleted.id) ?? old
      )
      queryClient.setQueryData<Deal[]>(
        ["deals", deleted.client_id],
        (old) => old?.filter((d) => d.id !== deleted.id) ?? old
      )
    },
  })
}