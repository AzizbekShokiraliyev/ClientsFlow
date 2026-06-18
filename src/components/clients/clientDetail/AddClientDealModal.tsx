import { Bookmark, Pencil, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog"
import { Field, FieldGroup } from "../../ui/field"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import type {
  DealClientModalProps,
} from "@/interface/Interface"
import { useState, useEffect } from "react"
import { useDealCreate, useDealUpdate } from "@/hooks/useDeal"
import { supabase } from "@/lib/supabase"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { dealSchema, type DealValues } from "@/lib/validation"

const AddClientDealModal = ({ deal }: DealClientModalProps) => {
  const isEdit = !!deal
  const [open, setOpen] = useState(false)
  const { mutate: editDeal, isPending: Updating } = useDealUpdate()
  const { mutate: createDeal, isPending: Creating } = useDealCreate()
  const { clientId } = useParams()
  const isPending = Creating || Updating

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<DealValues>({
    resolver: zodResolver(dealSchema),
    values: {
      title: deal?.title ?? "",
      status: deal?.status ?? "New",
      date: deal?.created_at ? deal.created_at.split("T")[0] : "",
    },
  })

  useEffect(() => {
    if (!open && !isEdit) {
      reset()
    }
  }, [open, isEdit, reset])

  const onSubmit = async (data: DealValues) => {
    const title = data.title
    const status = data.status
    const date = data.date
    try {
      if (isEdit) {
        editDeal(
          {
            id: deal.id,
            title,
            status,
            created_at: date ? new Date(date).toISOString() : undefined,
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

        createDeal(
          { title, status, user_id: user.id, client_id: clientId! },
          {
            onSuccess: () => {
              setOpen(false)
              reset()
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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {isEdit ? (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-none border-0"
            >
              <Pencil />
            </Button>
          ) : (
            <Button>
              <Plus />
              Add deal
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-3 text-center text-lg">
              <DialogTitle>{isEdit ? "Edit deal" : "Add Deal"}</DialogTitle>
            </div>

            <FieldGroup>
              <Field>
                <Label>Title</Label>
                <Input
                  placeholder="Write deal"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title.message}
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
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Won">Won</SelectItem>
                          <SelectItem value="Lost">Lost</SelectItem>
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

              <div className="flex items-end gap-2">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="date">Today's Date</Label>
                  <Input
                    type="date"
                    {...register("date")}
                  />
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.date.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isPending}>
                  {isEdit ? (
                    <>
                      <Bookmark /> {isPending ? "Saving..." : "Save"}
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
    </div>
  )
}

export default AddClientDealModal
