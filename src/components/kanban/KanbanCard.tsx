import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '../ui/card';
import type { KanbanCardProps } from '@/interface/Interface';

export const KanbanCard = ({ deal }: KanbanCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ 
    id: deal.id 
  });

  const style = { 
    transform: CSS.Transform.toString(transform), 
    transition 
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card className="p-4 cursor-grab active:cursor-grabbing hover:shadow-md">
            <h4 className="font-medium">{deal.title}</h4>
            <p className="text-xs text-muted-foreground mt-1">{deal.client}</p>
        </Card>
    </div>
  );
};