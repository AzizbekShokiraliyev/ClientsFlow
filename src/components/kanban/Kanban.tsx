import { useState } from 'react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import type { KanbanDeal, ClientDealStatus } from '@/interface/Interface';

const STATUSES: ClientDealStatus[] = ['New', 'In Progress', 'Won', 'Lost'];

const Kanban = () => {
  const [deals, setDeals] = useState<KanbanDeal[]>([
    { id: '1', title: 'Wireframes', status: 'New', client: 'Aziz' },
    { id: '2', title: 'SEO Package', status: 'In Progress', client: 'John' },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as ClientDealStatus;

    if (STATUSES.includes(overId) && activeId !== overId) {
      setDeals((items) =>
        items.map((item) =>
          item.id === activeId ? { ...item, status: overId } : item
        )
      );
    }
  };

  return (
    <div className="p-6">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="flex gap-6 items-start">
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
  );
};

export default Kanban;