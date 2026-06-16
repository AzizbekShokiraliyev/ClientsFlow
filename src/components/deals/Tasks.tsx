import { useNavigate } from "react-router-dom"
import TaskTable from "./TaskTable"
import { ArrowLeft } from "lucide-react"
import TaskModal from "./TaskModal"

const Tasks = () => {
  const navigate = useNavigate()

  return (
    <div>
      <div className="mb-5 flex justify-between">
        <div className="w-lg">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex cursor-pointer items-center gap-2 border-none bg-transparent text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to ClientDetail
          </button>
        </div>
        <div className="flex gap-3">
          <TaskModal />
        </div>
      </div>
      <TaskTable />
    </div>
  )
}

export default Tasks
