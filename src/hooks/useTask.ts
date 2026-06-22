import type { Task } from "@/interface/Interface"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTask = (dealId?: string) => {
  return useQuery({
    queryKey: ["tasks", dealId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("deal_id", dealId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },
    enabled: !!dealId,
  })
}

export const useAllTask = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      newTask: Omit<Task, "id" | "updated_at" | "created_at">
    ) => {
      const { data, error } = await supabase
        .from("tasks")
        .insert(newTask)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (created) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old ? [created, ...old] : [created]
      )
      queryClient.setQueryData<Task[]>(["tasks", created.deal_id], (old) =>
        old ? [created, ...old] : [created]
      )
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Task> & { id: string }) => {
      const { data, error } = await supabase
        .from("tasks")
        .update(updates)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (updated) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((t) => (t.id === updated.id ? updated : t)) ?? old
      )
      queryClient.setQueryData<Task[]>(["tasks", updated.deal_id], (old) =>
        old?.map((t) => (t.id === updated.id ? updated : t)) ?? old
      )
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: existing, error: fetchError } = await supabase
        .from("tasks")
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError

      const { error } = await supabase.from("tasks").delete().eq("id", id)
      if (error) throw error

      return existing as Task
    },
    onSuccess: (deleted) => {
      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.filter((t) => t.id !== deleted.id) ?? old
      )
      queryClient.setQueryData<Task[]>(["tasks", deleted.deal_id], (old) =>
        old?.filter((t) => t.id !== deleted.id) ?? old
      )
    },
  })
}