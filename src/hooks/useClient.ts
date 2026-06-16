import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { Client } from "@/interface/Interface"

export const useClient = () => {
    return useQuery({
        queryKey:["clients"],
        queryFn: async () => {
            const {data, error} = await supabase
            .from("clients")
            .select("*")
            .order("created_at", {ascending: false})

            if (error) throw error
            return data
        }
    })
}

export const useClientCreate = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["clients"],
        mutationFn: async (NewClient: Omit<Client, "id" | "updated_at" | "created_at">) => {
            const {data, error} = await supabase
            .from("clients")
            .insert(NewClient)
            .select()
            .single()

            if(error) throw error
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["clients"]})
    })
}

export const useClientUpdate = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["clients"],
        mutationFn: async ({id, ...updates}: Partial<Client> & {id: string}) => {
            const {data, error} = await supabase
            .from("clients")
            .update(updates)
            .eq("id", id)
            .single()

            if (error) throw error
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["clients"]})
    })
}

export const useClientDelete = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["clients"],
        mutationFn: async (id: string) => {
            const {data, error} = await supabase
            .from("clients")
            .delete()
            .eq("id", id)

            if(error) throw error
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["clients"]})
    })
}