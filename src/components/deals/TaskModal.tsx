import type { TaskStatus, TaskModalProps } from "@/interface/Interface"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Bookmark, Pencil, Plus } from "lucide-react"
import { Field, FieldGroup } from "../ui/field"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useCreateTask, useUpdateTask } from "@/hooks/useTask"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { Textarea } from "../ui/textarea"

const TaskModal = ({ task }: TaskModalProps) => {
  const isEdit = !!task
  const [open, setOpen] = useState(false)
  const { dealId } = useParams()
  const { mutate: taskEdit, isPending: isUpdating } = useUpdateTask()
  const { mutate: taskCreate, isPending: isCreating } = useCreateTask()

  const isPending = isCreating || isUpdating

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as TaskStatus
    const date = formData.get("date") as string

    if (!title.trim()) return

    try {
      if (isEdit) {
        taskEdit(
          {
            id: task.id,
            title,
            description: description || null,
            status,
            due_date: date ? new Date(date).toISOString() : undefined,
          },
          {
            onSuccess: () => setOpen(false),
          }
        )
      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          toast("Iltimos, avval tizimga kiring!")
          return
        }

        taskCreate(
          {
            title,
            status,
            user_id: user.id,
            deal_id: dealId!,
            description: description || null,
            due_date: date ? new Date(date).toISOString() : null,
          },
          {
            onSuccess: () => setOpen(false),
            onError: (err) => console.error("Xatolik:", err),
          }
        )
      }
    } catch (error) {
      console.error("Kutilmagan xatolik:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-none border-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button size="lg">
            <Plus />
            Add task
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-center text-lg">
            <DialogTitle>{isEdit ? "Edit task" : "Add new task"} </DialogTitle>
          </div>

          <FieldGroup>
            <Field>
              <Label>Title</Label>
              <Input
                name="title"
                placeholder="Enter task name..."
                defaultValue={task?.title ?? ""}
                required
              />
            </Field>

            <Field>
              <Label>Description</Label>
              <Textarea
                name="description"
                placeholder="Enter description..."
                defaultValue={task?.description ?? ""}
                rows={3}
              />
            </Field>

            <Field>
              <Label>Status</Label>
              <Select name="status" defaultValue={task?.status ?? "Todo"}>
                <SelectTrigger className="w-full max-w-96">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <div className="mt-4 flex items-end gap-2">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="date">Due Date</Label>{" "}
                <Input
                  name="date"
                  type="date"
                  defaultValue={
                    task?.due_date
                      ? task.due_date.split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                />
              </div>
              <Button type="submit" disabled={isPending}>
                {isEdit ? (
                  <>
                    <Bookmark /> {isPending ? "Saving..." : "Save changes"}
                  </>
                ) : (
                  <>
                    <Plus /> {isPending ? "Adding..." : "Add"}
                  </>
                )}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TaskModal
