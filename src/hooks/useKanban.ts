import { supabase } from "@/lib/supabase"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { ClientDealStatus, KanbanDeal } from "@/interface/Interface"

export const useKanbanDeals = () => {
    return useQuery({
        queryKey: ["kanban-deals"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("deals")
                .select(`
                    id,
                    title,
                    status,
                    clients(name)
                `)
                .order("created_at", { ascending: false })

            if (error) throw error

            return data.map((deal) => ({
            id: deal.id,
            title: deal.title,
            status: deal.status as ClientDealStatus,
            client: (deal.clients as unknown as { name: string })?.name ?? "Unknown",
        }))
        },
    })
}

export const useKanbanStatusUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ClientDealStatus }) => {
      const { data, error } = await supabase
        .from("deals")
        .update({ status })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (updatedDeal) => {
      queryClient.setQueryData(["kanban-deals"], (old: KanbanDeal[]) =>
        old.map((d) =>
          d.id === updatedDeal.id ? { ...d, status: updatedDeal.status } : d
        )
      )
    },
  })
}