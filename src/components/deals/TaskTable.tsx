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

const TaskTable = () => {
  const { data: tasks, isLoading, isError } = useTask()
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
            <TableHead>Status</TableHead>
            <TableHead>Date added</TableHead>
            <TableHead>Date updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(tasks ?? []).length === 0 ? (
            <TableRow>
              <TableCell colSpan={6}>
                <div className="py-10 text-center text-sm text-muted-foreground">
                  No deals found.
                </div>
              </TableCell>
            </TableRow>
          ) : (
            (tasks ?? []).map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "w-[5vw] rounded-md border px-2.5 py-1 text-center text-xs font-medium",
                      [item.status]
                    )}
                  >
                    {item.status}
                  </span>
                </TableCell>
                <TableCell>
                  {item.created_at
                    ? new Date(item.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "—"}
                </TableCell>
                <TableCell>
                  {item.updated_at
                    ? new Date(item.updated_at).toLocaleDateString("en-US", {
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
