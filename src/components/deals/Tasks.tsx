import { useNavigate, useParams } from "react-router-dom"
import TaskTable from "./TaskTable"
import { ArrowLeft } from "lucide-react"
import TaskModal from "./TaskModal"
import { useClient } from "@/hooks/useClient"
import ExportCsvButton from "../clients/ExportCsvButton"
import { UseDeal } from "@/hooks/useDeal"
import { useTask } from "@/hooks/useTask"

const Tasks = () => {
  const navigate = useNavigate()
  const { clientId, dealId } = useParams()
  const { data: client } = useClient()
  const { data: deals } = UseDeal(clientId)
  const { data: tasks } = useTask(dealId)

  const clients = client?.find((c) => c.id === clientId)
  const currentDeal = deals?.find((d) => d.id === dealId)

  return (
    <div>
      <div className="mb-5 flex justify-between">
        <div className="w-lg">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex cursor-pointer items-center gap-2 border-none bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {clients?.name}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{currentDeal?.title}</h1>
            <span className="inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium">
              {currentDeal?.status}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <ExportCsvButton
            data={tasks ?? []}
            filename="tasks"
            headers={["Title", "Description", "Status", "Due Date"]}
            keys={["title", "description", "status", "due_date"]}
          />
          <TaskModal />
        </div>
      </div>
      <TaskTable />
    </div>
  )
}

export default Tasks
