import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard } from "./KanbanCard"
import type { KanbanColumnProps } from "@/interface/Interface"

export const KanbanColumn = ({ status, deals }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className="min-h-[650px] w-82 rounded-lg bg-muted/50 p-4"
    >
      <div className="item-center flex gap-1 text-sm font-semibold text-muted-foreground">
        <div>
          <h3 className="mb-4 uppercase">
            <div>{status}:</div>
          </h3>
        </div>
        <div>{deals.length}</div>
      </div>
      <SortableContext
        items={deals.map((d) => d.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {deals.map((deal) => (
            <KanbanCard key={deal.id} deal={deal} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
