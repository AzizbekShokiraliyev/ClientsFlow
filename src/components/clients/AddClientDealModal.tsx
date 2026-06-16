import { Bookmark, Pencil, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import type {
  ClientDealStatus,
  DealClientModalProps,
} from "@/interface/Interface"
import { useState } from "react"
import { UseDealCreate, useDealUpdate } from "@/hooks/useDeal"
import { supabase } from "@/lib/supabase"
import { useParams } from "react-router-dom"

const AddClientDealModal = ({ deal }: DealClientModalProps) => {
  const isEdit = !!deal
  const [open, setOpen] = useState(false)
  const { mutate: editDeal, isPending: Updating } = useDealUpdate()
  const { mutate: createDeal, isPending: Creating } = UseDealCreate()
  const { clientId } = useParams()
  const isPending = Creating || Updating

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const status = formData.get("status") as ClientDealStatus
    const date = formData.get("date") as string

    if (!title.trim()) return

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
          alert("Iltimos, avval tizimga kiring!")
          return
        }

        createDeal(
          { title, status, user_id: user.id, client_id: clientId! },
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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {isEdit ? (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-none border-0"
            >
              {" "}
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
          <form onSubmit={handleSubmit}>
            <DialogTitle>{isEdit ? "Edit deal" : "Add Deal"}</DialogTitle>

            <FieldGroup>
              <Field>
                <Label>Title</Label>
                <Input
                  name="title"
                  placeholder="Write deal"
                  defaultValue={deal?.title ?? ""}
                />
              </Field>

              <Field>
                <Label>Status</Label>

                <Select name="status" defaultValue={deal?.status ?? "New"}>
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
              </Field>

              <div className="flex items-end gap-2">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="date">Today's Date</Label>
                  <Input
                    name="date"
                    type="date"
                    defaultValue={deal?.created_at?.split("T")[0]}
                  />
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
