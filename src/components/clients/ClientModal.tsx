import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useClientCreate, useClientUpdate } from "@/hooks/useClient"
import type { ClientModalProps } from "@/interface/Interface"
import { supabase } from "@/lib/supabase"
import { Bookmark, Pencil, Plus } from "lucide-react"
import type React from "react"
import { useState } from "react"

const ClientModal = ({ client }: ClientModalProps) => {
  const isEdit = !!client
  const [open, setOpen] = useState(false)
  const { mutate: editClient, isPending: updating } = useClientUpdate()
  const { mutate: createClient, isPending: creating } = useClientCreate()

  const isPending = creating || updating

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const date = formData.get("date") as string

    if (!name.trim() || !email) return

    try {
      if (isEdit) {
        editClient(
          {
            id: client.id,
            name,
            email: email || null,
            phone: phone || null,
            company: company || null,
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

        createClient(
          {
            name,
            email: email || null,
            phone: phone || null,
            company: company || null,
            user_id: user.id,
          },
          {
            onSuccess: () => setOpen(false),
            onError: (err) => console.error("Xatolik:", err),
          }
        )
      }
    } catch (error) {
      console.error("Kutilmagan xatolik yuz berdi:", error)
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
            <Pencil />
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

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit}>
          <div className="text-center text-lg">
            <DialogTitle>
              {isEdit ? "Edit client" : "Add new client"}
            </DialogTitle>
          </div>

          <FieldGroup>
            <Field>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="John Doe"
                defaultValue={client?.name ?? ""}
                required
              />
            </Field>

            <Field>
              <Label>Email</Label>
              <Input
                name="email"
                placeholder="example@gmail.com"
                type="email"
                defaultValue={client?.email ?? ""}
              />
            </Field>

            <Field>
              <Label>Phone number</Label>
              <Input
                name="phone"
                placeholder="+123456789"
                type="tel"
                defaultValue={client?.phone ?? ""}
              />
            </Field>

            <Field>
              <Label>Company name</Label>
              <Input
                name="company"
                placeholder="Google"
                defaultValue={client?.company ?? ""}
              />
            </Field>

            <div className="flex items-end gap-2">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="date">Today's Date</Label>
                <Input
                  name="date"
                  type="date"
                  defaultValue={client?.updated_at?.split("T")[0]}
                />
              </div>

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  "Saving..."
                ) : isEdit ? (
                  <>
                    <Bookmark /> Save changes
                  </>
                ) : (
                  <>
                    <Plus /> Add
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

export default ClientModal
