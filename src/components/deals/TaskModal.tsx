import type { TaskModalProps } from "@/interface/Interface"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { Bookmark, ChevronDownIcon, Pencil, Plus } from "lucide-react"
import { Field, FieldGroup } from "../ui/field"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Calendar } from "../ui/calendar"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useCreateTask, useUpdateTask } from "@/hooks/useTask"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { taskSchema, type TaskValues } from "@/lib/validation"
import { useEffect } from "react"
import { format } from "date-fns"

const TaskModal = ({ task }: TaskModalProps) => {
  const isEdit = !!task
  const [open, setOpen] = useState(false)
  const { dealId } = useParams()
  const { mutate: taskEdit, isPending: isUpdating } = useUpdateTask()
  const { mutate: taskCreate, isPending: isCreating } = useCreateTask()

  const isPending = isCreating || isUpdating

  const [date, setDate] = useState<Date | undefined>(
    task?.due_date ? new Date(task.due_date) : new Date()
  )

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),
    values: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "Todo",
      date: task?.due_date
        ? task.due_date.split("T")[0]
        : new Date().toISOString().split("T")[0],
    },
  })

  useEffect(() => {
    if (!open && !isEdit) {
      reset()
    }
  }, [open, isEdit, reset])

  const handleDateSelect = (selected: Date | undefined) => {
    setDate(selected)
    setValue("date", selected ? format(selected, "yyyy-MM-dd") : "", {
      shouldValidate: true,
    })
  }

  const handleOpenChange = (val: boolean) => {
    setOpen(val)
    if (!val && !isEdit) {
      setDate(new Date())
    }
  }

  const onSubmit = async (data: TaskValues) => {
    try {
      if (isEdit) {
        taskEdit(
          {
            id: task.id,
            title: data.title,
            description: data.description || null,
            status: data.status,
            due_date: data.date ? new Date(data.date).toISOString() : undefined,
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
          toast.error("Iltimos, avval tizimga kiring!")
          return
        }

        taskCreate(
          {
            title: data.title,
            status: data.status,
            user_id: user.id,
            deal_id: dealId!,
            description: data.description || null,
            due_date: data.date ? new Date(data.date).toISOString() : null,
          },
          {
            onSuccess: () => {
              setOpen(false)
              reset()
              setDate(new Date())
            },
            onError: (err) => console.error("Xatolik:", err),
          }
        )
      }
    } catch (error) {
      console.error("Kutilmagan xatolik:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-center text-lg">
            <DialogTitle>{isEdit ? "Edit task" : "Add new task"} </DialogTitle>
          </div>

          <FieldGroup>
            <Field>
              <Label>Title</Label>
              <Input placeholder="Enter task name..." {...register("title")} />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.title.message}
                </p>
              )}
            </Field>

            <Field>
              <Label>Description</Label>
              <Textarea
                placeholder="Enter description..."
                rows={3}
                {...register("description")}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </Field>

            <Field>
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
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
                )}
              />
              {errors.status && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.status.message}
                </p>
              )}
            </Field>

            <div className="mt-4 flex items-end gap-2">
              <div className="grid w-full gap-1.5">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className="w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {date ? format(date, "PPP") : <span>dd/mm/yyyy</span>}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      defaultMonth={date}
                    />
                  </PopoverContent>
                </Popover>
                {errors.date && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.date.message}
                  </p>
                )}
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
