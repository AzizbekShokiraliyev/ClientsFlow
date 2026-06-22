import { useParams } from "react-router-dom"
import { DeleteDialog } from "../shared/DeleteDialog"
import { cn } from "@/lib/utils"
import TaskModal from "./TaskModal"
import { ButtonGroup, ButtonGroupSeparator } from "../ui/button-group"
import { useDeleteTask, useTask } from "@/hooks/useTask"
import { DealStatusStyles } from "../shared/StyleStatus"
import type { TaskStatus, Task, ColumnDef } from "@/interface/Interface"
import { DataTable } from "../shared/DataTable"

const TaskTable = () => {
  const { dealId } = useParams()
  const { data: tasks, isLoading, isError } = useTask(dealId)
  const { mutate: deleteDeal, isPending: deleting } = useDeleteTask()

  const columns: ColumnDef<Task>[] = [
    { header: "Title", render: (t) => t.title },
    { header: "Description", render: (t) => t.description ?? "—" },
    {
      header: "Status",
      render: (t) => (
        <span className={cn(DealStatusStyles[t.status as TaskStatus])}>
          {t.status}
        </span>
      ),
    },
    {
      header: "Due Date",
      render: (t) =>
        t.due_date
          ? new Date(t.due_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "—",
    },
  ]

  return (
    <DataTable
      columns={columns}
      data={tasks}
      isLoading={isLoading}
      isError={isError}
      emptyText="No deals found."
      renderActions={(item) => (
        <ButtonGroup>
          <TaskModal task={item} />
          <ButtonGroupSeparator />
          <DeleteDialog
            deleteTitle={`${item.title}`}
            onConfirm={() => deleteDeal(item.id)}
            disabled={deleting}
          />
        </ButtonGroup>
      )}
    />
  )
}

export default TaskTable
