import type { DealModalProps, DealStatus } from "@/interface/Interface"
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
import { UseDealCreate, useDealUpdate } from "@/hooks/useDeal"
import { supabase } from "@/lib/supabase"

const DealModal = ({ deal }: DealModalProps) => {
  const isEdit = !!deal
  const [open, setOpen] = useState(false)

  const { mutate: dealEdit, isPending: isUpdating } = useDealUpdate()
  const { mutate: dealCreate, isPending: isCreating } = UseDealCreate()

  const isPending = isCreating || isUpdating

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const status = formData.get("status") as DealStatus
    const date = formData.get("date") as string

    if (!title.trim() || !status) return

    try {
      if (isEdit) {
        dealEdit(
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
          alert("Iltimos, avval tizimga kiring!")
          return
        }

        dealCreate(
          {
            title,
            status,
            user_id: user.id,
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
            <span>
              <Plus />
            </span>
            Add client
          </Button>
        )}
      </DialogTrigger>

      {/* MUHIM: Form elementini DialogContent'ning ICHIGA joylashtirdik */}
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-center text-lg">
            <DialogTitle>{isEdit ? "Edit deal" : "Add new deal"}</DialogTitle>
          </div>

          <FieldGroup>
            {/* Title Input */}
            <Field>
              <Label>Title</Label>
              <Input
                name="title"
                placeholder="Enter deal name..."
                defaultValue={deal?.title ?? ""}
                required
              />
            </Field>

            {/* Status Select */}
            <Field>
              <Label>Status</Label>
              {/* MUHIM: Select'ga name va defaultValue berildi */}
              <Select name="status" defaultValue={deal?.status ?? "Todo"}>
                <SelectTrigger className="w-full max-w-96">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="InProgress">In progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            {/* Date Input va Submit tugmasi */}
            <div className="mt-4 flex items-end gap-2">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="date">Today's Date</Label>
                <Input
                  name="date"
                  type="date"
                  defaultValue={
                    deal?.created_at
                      ? deal.created_at.split("T")[0]
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

export default DealModal
