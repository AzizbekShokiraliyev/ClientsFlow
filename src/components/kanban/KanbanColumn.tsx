import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { KanbanCard } from "./KanbanCard"
import type { KanbanColumnProps } from "@/interface/Interface"

export const KanbanColumn = ({ status, deals }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className="flex h-[calc(95vh-140px)] w-80 flex-shrink-0 flex-col rounded-xl border border-border/40 bg-muted/50 p-4"
    >
      {/* Sarlavha qotib turadi (Scroll bo'lmaydi) */}
      <div className="mb-4 flex items-center justify-between px-1 text-sm font-semibold text-muted-foreground">
        <h3 className="tracking-wider uppercase">{status}</h3>
        <span className="rounded-full bg-muted px-2 py-0.5 text-xs">
          {deals.length}
        </span>
      </div>

      {/* Faqat kartochkalar turgan joy scroll bo'ladi */}
      <SortableContext
        items={deals.map((d) => d.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 scrollbar-thin space-y-3 overflow-y-auto p-1 select-none">
          {deals.map((deal) => (
            <KanbanCard key={deal.id} deal={deal} />
          ))}

          {/* Ustun bo'sh bo'lsa ham pastki qismiga tashlay olish uchun bo'sh joy */}
          {deals.length === 0 && (
            <div className="flex h-20 items-center justify-center rounded-lg border-2 border-dashed border-muted text-xs text-muted-foreground/60">
              Drop here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}
