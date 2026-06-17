import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core"
import { KanbanColumn } from "./KanbanColumn"
import type { ClientDealStatus } from "@/interface/Interface"
import { useKanbanDeals, useKanbanStatusUpdate } from "@/hooks/useKanban"

const STATUSES: ClientDealStatus[] = ["New", "In Progress", "Won", "Lost"]

const Kanban = () => {
  const { data: deals = [], isLoading, isError } = useKanbanDeals()
  const { mutate: updateStatus } = useKanbanStatusUpdate()

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as ClientDealStatus

    if (STATUSES.includes(overId) && activeId !== overId) {
      updateStatus({ id: activeId, status: overId }) // ✅ backend ga yuboradi
    }
  }

  if (isLoading) return <div className="p-10 text-center">Loading...</div>
  if (isError)
    return <div className="p-10 text-center text-red-500">Error occurred.</div>

  return (
    <div className="p-6">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex items-start gap-6">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              deals={deals.filter((d) => d.status === status)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  )
}

export default Kanban
