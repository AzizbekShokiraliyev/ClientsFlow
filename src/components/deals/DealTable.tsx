import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import type { Deal } from '@/interface/Interface'
import { DeleteDialog } from '../shared/DeleteDialog'
import { cn } from '@/lib/utils'
import DealModal from './DealModal'
import { DealStatusStyles } from '../shared/StyleStatus'

const deal: Deal[] = [
  {
    id: "1",
    user_id: "u1",
    client_id: "c1",
    title: "Wireframes",
    description: "Lorem, ipsum dolor",
    status: "Todo",
    due_date: "2024-02-10T00:00:00Z",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-02-10T00:00:00Z",
  },
  {
    id: "2",
    user_id: "u1",
    client_id: "c1",
    title: "Google",
    description: "Lorem, ipsum dolor",
    status: "Done",
    due_date: "2024-02-10T00:00:00Z",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-02-10T00:00:00Z",
  },
  {
    id: "3",
    user_id: "u1",
    client_id: "c1",
    title: "Amazon",
    description: "Lorem, ipsum dolor",
    status: "In Progress",
    due_date: "2024-02-10T00:00:00Z",
    created_at: "2024-02-10T00:00:00Z",
    updated_at: "2024-02-10T00:00:00Z",
  },
]

const DealTable = () => {
  return (
    <div className="rounded-lg border px-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date added</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deal.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                No deals found.
              </TableCell>
            </TableRow>
          ) : (
            deal.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description ?? "—"}</TableCell>
                <TableCell>
                  <span className={cn("text-xs font-medium px-2.5 py-1 rounded-md border w-[5vw] text-center", DealStatusStyles[item.status])}>
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  {item.due_date
                    ? new Date(item.due_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <DealModal deal={item} />
                    <DeleteDialog
                      deleteTitle={`${item.title}`}
                      onConfirm={() => console.log("Deleted", item.title)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default DealTable