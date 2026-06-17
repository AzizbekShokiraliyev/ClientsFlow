import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "../ui/card"
import type { KanbanCardProps } from "@/interface/Interface"

export const KanbanCard = ({ deal }: KanbanCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: deal.id,
    })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="cursor-grab hover:shadow-md active:cursor-grabbing">
        <Card>
          <p className="px-4 text-xs text-muted-foreground">{deal.client}</p>
          <h4 className="px-4 font-medium">{deal.title}</h4>
        </Card>
      </div>
    </div>
  )
}
