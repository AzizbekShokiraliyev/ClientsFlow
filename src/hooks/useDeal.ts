import type { Deal } from "@/interface/Interface"
import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const UseDeal = () => {
    return useQuery({
        queryKey: ["deals"],
        queryFn: async () => {
            const {data, error} = await supabase
            .from("deals")
            .select("*")
            .order("created_at", { ascending: false })

            if (error) throw error
            return data
        }
    })
}

export const UseDealCreate = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationKey: ["deals"],
        mutationFn: async (newDeal: Omit<Deal, "id" | "updated_at" | "created_at">) => {
            const { data, error } = await supabase
                .from("deals") 
                .insert(newDeal)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] })
    })
}

export const useDealUpdate = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["deals"],
        mutationFn: async ({id, ...updates}: Partial<Deal> & {id: string}) => {
            const {data, error} = await supabase
            .from("deals")
            .update(updates)
            .eq("id", id)
            .single()

            if (error) throw error
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["deals"] })
    })
}

export const useDealDelate = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["deals"],
        mutationFn: async (id: string) => {
            const {data, error} = await supabase
            .from("deals")
            .delete()
            .eq("id", id)

            if(error) throw error
            return data
        },
        onSuccess: () => queryClient.invalidateQueries({queryKey: ["deals"]})
    })
}