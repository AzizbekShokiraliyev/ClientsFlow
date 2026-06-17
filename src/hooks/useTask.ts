import type { Task } from "@/interface/Interface"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useTask = (dealId?: string) => {
    return useQuery({
        queryKey: ["tasks", dealId],
        queryFn: async () => {
            const {data, error} = await supabase
            .from("tasks")
            .select("*")
            .eq("deal_id", dealId)
            .order("created_at", {ascending: false})

            if(error) throw error
            return data
        },
        enabled: !!dealId
    })
}

export const useCreateTask = () => {
    const clientQuery = useQueryClient()

    return useMutation({
        mutationKey: ["tasks"],
        mutationFn: async (newTask: Omit<Task, "id" | "updated_at" | "created_at">) => {
            const {data, error} = await supabase
            .from("tasks")
            .insert(newTask)
            .select()
            .single()

            if(error) throw error
            return data
        },
        onSuccess: () => clientQuery.invalidateQueries({queryKey: ["tasks"]})
    })
}

export const useUpdateTask = () => {
    const clientQuery = useQueryClient()

    return useMutation({
        mutationKey: ["tasks"],
        mutationFn: async ({id, ...updates}: Partial<Task> & {id: string}) => {
            const {data, error} = await supabase
            .from("tasks")
            .update(updates)
            .eq("id", id)
            .single()

            if (error) throw error
            return data
        },
        onSuccess: () => clientQuery.invalidateQueries({queryKey: ["tasks"]})
    })
}

export const useDeleteTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["tasks"],
        mutationFn: async (id: string) => {
            const {data, error} = await supabase
            .from("tasks")
            .delete()
            .eq("id", id)

            if (error) throw error
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["tasks"]})
    })
}

export const AllTask = () => {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const {data, error} = await supabase
            .from("tasks")
            .select("*")
            .order("created_at", {ascending: false})

            if(error) throw error
            return data
        },
    })
}