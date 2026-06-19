import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "../ui/card"
import type { KanbanCardProps } from "@/interface/Interface"
import { User } from "lucide-react"

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
        <Card className="flex flex-col gap-1.5 p-4 transition-shadow duration-200 hover:shadow-md">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{deal.client}</span>
          </div>

          <h4 className="text-sm leading-none font-semibold tracking-tight text-foreground">
            {deal.title}
          </h4>
        </Card>
      </div>
    </div>
  )
}
