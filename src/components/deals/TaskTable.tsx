import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { DeleteDialog } from "../shared/DeleteDialog"
import { cn } from "@/lib/utils"
import TaskModal from "./TaskModal"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import { useDeleteTask, useTask } from "@/hooks/useTask"
import { Card } from "../ui/card"
import { useParams } from "react-router-dom"

const TaskTable = () => {
  const { dealId } = useParams()
  const { data: tasks, isLoading, isError } = useTask(dealId)
  const { mutate: deleteDeal, isPending: deleting } = useDeleteTask()

  if (isLoading) return <div className="p-10 text-center">Loading deals...</div>
  if (isError)
    return (
      <div className="p-10 text-center text-red-500">
        An error occurred, please refresh the page.
      </div>
    )

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(tasks ?? []).length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="py-10 text-center text-sm text-muted-foreground">
                  No deals found.
                </div>
              </TableCell>
            </TableRow>
          ) : (
            (tasks ?? []).map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description ?? "—"}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "rounded-md border px-2.5 py-1 text-center text-xs font-medium",
                      [item.status]
                    )}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {item.due_date
                    ? new Date(item.due_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center divide-x overflow-hidden rounded-md border">
                    <ButtonGroup>
                      <TaskModal task={item} />
                      <ButtonGroupSeparator />
                      <DeleteDialog
                        deleteTitle={`${item.title}`}
                        onConfirm={() => deleteDeal(item.id)}
                        disabled={deleting}
                      />
                    </ButtonGroup>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
export default TaskTable
