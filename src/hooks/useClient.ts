import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Client } from "@/interface/Interface"

export const useClient = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },
  })
}

export const useClientCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      newClient: Omit<Client, "id" | "updated_at">
    ) => {
      const { data, error } = await supabase
        .from("clients")
        .insert(newClient)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (created) => {
      queryClient.setQueryData<Client[]>(["clients"], (old) =>
        old ? [created, ...old] : [created]
      )
    },
  })
}

export const useClientUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Client> & { id: string }) => {
      const { data, error } = await supabase
        .from("clients")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Client[]>(["clients"], (old) =>
        old?.map((c) => (c.id === updated.id ? updated : c)) ?? old
      )
      queryClient.setQueryData(["client", updated.id], updated)
    },
  })
}

export const useClientDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("clients").delete().eq("id", id)
      if (error) throw error
      return id
    },
    onSuccess: (deletedId) => {
      queryClient.setQueryData<Client[]>(["clients"], (old) =>
        old?.filter((c) => c.id !== deletedId) ?? old
      )
    },
  })
}

export const useClientById = (clientId?: string) => {
  return useQuery({
    queryKey: ["client", clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", clientId)
        .single()

      if (error) throw error
      return data
    },
    enabled: !!clientId,
  })
}