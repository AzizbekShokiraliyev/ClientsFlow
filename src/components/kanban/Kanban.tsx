import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
  pointerWithin,
} from "@dnd-kit/core"
import { KanbanColumn } from "./KanbanColumn"
import { KanbanCard } from "./KanbanCard"
import type { ClientDealStatus, KanbanDeal } from "@/interface/Interface"
import { useKanbanDeals, useKanbanStatusUpdate } from "@/hooks/useKanban"

const STATUSES: ClientDealStatus[] = ["New", "In Progress", "Won", "Lost"]

const Kanban = () => {
  const { data: deals = [], isLoading, isError } = useKanbanDeals()
  const { mutate: updateStatus } = useKanbanStatusUpdate()

  const [activeDeal, setActiveDeal] = useState<KanbanDeal | null>(null)

  const findColumnStatus = (id: string): ClientDealStatus | null => {
    if (STATUSES.includes(id as ClientDealStatus)) {
      return id as ClientDealStatus
    }
    const deal = deals.find((d) => d.id === id)
    return deal ? (deal.status as ClientDealStatus) : null
  }

  const handleDragStart = (event: DragStartEvent) => {
    const deal = deals.find((d) => d.id === event.active.id)
    if (deal) setActiveDeal(deal)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveDeal(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findColumnStatus(activeId)
    const overContainer = findColumnStatus(overId)

    if (!activeContainer || !overContainer) return

    if (activeContainer !== overContainer) {
      updateStatus({ id: activeId, status: overContainer })
    }
  }

  if (isLoading) return <div className="p-10 text-center">Loading...</div>
  if (isError)
    return <div className="p-10 text-center text-red-500">Error occurred</div>

  return (
    <div className="h-full overflow-x-auto p-6">
      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex min-w-max items-start gap-6 pb-4">
          {STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              deals={deals.filter((d) => d.status === status)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDeal ? (
            <div className="scale-105 rotate-2 opacity-80 transition-transform">
              <KanbanCard deal={activeDeal} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default Kanban
