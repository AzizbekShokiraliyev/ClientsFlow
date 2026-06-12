import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { KanbanCard } from './KanbanCard';
import type { KanbanColumnProps } from '@/interface/Interface';

export const KanbanColumn = ({ status, deals }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} className="bg-muted/50 p-4 rounded-lg w-82 min-h-[650px]">
      <h3 className="font-semibold mb-4 text-sm uppercase text-muted-foreground">{status}</h3>
      <SortableContext items={deals.map(d => d.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {deals.map((deal) => (
            <KanbanCard key={deal.id} deal={deal} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};