import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { useState } from "react"
import { toast } from "sonner"
import { clientSchema, type ClientValues } from "@/lib/validation"

const ClientModal = ({ client }: ClientModalProps) => {
  const isEdit = !!client
  const [open, setOpen] = useState(false)

  const { mutate: editClient, isPending: updating } = useClientUpdate()
  const { mutate: createClient, isPending: creating } = useClientCreate()
  const isPending = creating || updating

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientValues>({
    resolver: zodResolver(clientSchema),
    values: {
      name: client?.name ?? "",
      email: client?.email ?? "",
      phone: client?.phone ?? "",
      company: client?.company ?? "",
      date: client?.updated_at ? client.updated_at.split("T")[0] : "",
    },
  })

  //tassavur qil user client qoshmoqchi malumotyozdi lekin fikridan qaytdi shu paytda bu effect uni tozalaydi

  useEffect(() => {
    if (!open && !isEdit) {
      reset()
    }
  }, [open, isEdit, reset])

  const onSubmit = async (data: ClientValues) => {
    try {
      if (isEdit) {
        editClient(
          {
            id: client.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company,
            created_at: data.date
              ? new Date(data.date).toISOString()
              : undefined,
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

        createClient(
          {
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            company: data.company || null,
            user_id: user.id,
          },
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center text-lg">
            <DialogTitle>
              {isEdit ? "Edit client" : "Add new client"}
            </DialogTitle>
          </div>

          <FieldGroup>
            <Field>
              <Label>Name</Label>
              <Input placeholder="John Doe" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </Field>

            <Field>
              <Label>Email</Label>
              <Input placeholder="example@gmail.com" {...register("email")} />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </Field>

            <Field>
              <Label>Phone number</Label>
              <Input
                type="tel"
                placeholder="+123456789"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </Field>

            <Field>
              <Label>Company name</Label>
              <Input placeholder="GL Solutions" {...register("company")} />
              {errors.company && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.company.message}
                </p>
              )}
            </Field>

            <div className="flex items-end gap-2">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="date">Today's Date</Label>
                <Input type="date" {...register("date")} />
                {errors.date && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.date.message}
                  </p>
                )}
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
